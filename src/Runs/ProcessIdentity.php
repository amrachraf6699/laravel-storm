<?php

namespace AmrAchraf\LaravelStorm\Runs;

use Symfony\Component\Process\Process;

final class ProcessIdentity
{
    public function inspect(int $pid): ?array
    {
        if ($pid <= 0) {
            return null;
        }
        if (PHP_OS_FAMILY === 'Windows') {
            $script = '$p = Get-CimInstance Win32_Process -Filter "ProcessId = '.$pid.'"; if ($p) { @{ pid = $p.ProcessId; command = $p.CommandLine; birth = $p.CreationDate.ToUniversalTime().ToString("o") } | ConvertTo-Json -Compress }';
            $process = new Process(['powershell.exe', '-NoProfile', '-NonInteractive', '-Command', $script]);
            $process->setTimeout(10)->run();
            $data = json_decode($process->getOutput(), true);

            return is_array($data) && isset($data['birth'], $data['command']) ? $data : null;
        }
        if (PHP_OS_FAMILY === 'Linux') {
            $stat = @file_get_contents('/proc/'.$pid.'/stat');
            $command = @file_get_contents('/proc/'.$pid.'/cmdline');
            if ($stat === false || $command === false) {
                return null;
            }
            $fields = explode(' ', substr($stat, (int) strrpos($stat, ')') + 2));

            return ['pid' => $pid, 'command' => str_replace("\0", ' ', $command), 'birth' => $fields[19] ?? null];
        }

        return null;
    }

    public function matches(array $identity, string $marker): bool
    {
        $current = $this->inspect((int) ($identity['pid'] ?? 0));

        return $current !== null && $current['birth'] === ($identity['birth'] ?? null) && str_contains($current['command'], $marker);
    }

    public function memoryBytes(int $pid): ?int
    {
        if (PHP_OS_FAMILY === 'Linux') {
            $status = @file_get_contents('/proc/'.$pid.'/status');
            if (is_string($status) && preg_match('/^VmRSS:\s+(\d+)\s+kB/m', $status, $match)) {
                return (int) $match[1] * 1024;
            }
        }
        if (PHP_OS_FAMILY === 'Windows') {
            $process = new Process(['tasklist.exe', '/FI', 'PID eq '.$pid, '/FO', 'CSV', '/NH']);
            $process->setTimeout(5)->run();
            $fields = str_getcsv(trim($process->getOutput()), ',', '"', '');
            if (isset($fields[4]) && (int) ($fields[1] ?? 0) === $pid) {
                return (int) preg_replace('/\D/', '', $fields[4]) * 1024;
            }
        }

        return null;
    }

    public function terminate(array $identity, string $marker): bool
    {
        if (! $this->matches($identity, $marker)) {
            return false;
        }
        $command = PHP_OS_FAMILY === 'Windows' ? ['taskkill.exe', '/PID', (string) $identity['pid'], '/T', '/F'] : ['kill', '-KILL', (string) $identity['pid']];
        $process = new Process($command);
        $process->setTimeout(10)->run();

        return $process->isSuccessful();
    }
}
