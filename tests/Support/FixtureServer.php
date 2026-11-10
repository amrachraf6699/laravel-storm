<?php

namespace AmrAchraf\LaravelStorm\Tests\Support;

use GuzzleHttp\Client;
use Symfony\Component\Process\Process;

final class FixtureServer
{
    public Process $process;

    public string $origin;

    public function __construct()
    {
        $this->process = new Process(['node', __DIR__.'/../Fixtures/server.mjs']);
        $this->process->setTimeout(null)->start();
        $output = '';
        $deadline = microtime(true) + 10;
        do {
            $output .= $this->process->getIncrementalOutput();
            $line = json_decode(trim($output), true);
            if (isset($line['port'])) {
                $this->origin = 'http://127.0.0.1:'.$line['port'];

                return;
            }
            usleep(20000);
        } while (microtime(true) < $deadline && $this->process->isRunning());
        throw new \RuntimeException('HTTP fixture could not start.');
    }

    public function stats(): array
    {
        return json_decode((string) (new Client)->get($this->origin.'/stats')->getBody(), true);
    }

    public function __destruct()
    {
        $this->process->stop(1);
    }
}
