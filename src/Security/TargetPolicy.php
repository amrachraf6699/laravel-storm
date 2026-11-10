<?php

namespace AmrAchraf\LaravelStorm\Security;

use InvalidArgumentException;

final class TargetPolicy
{
    public function __construct(private array $settings) {}

    public function approve(string $origin): array
    {
        $parts = parse_url($origin);
        if (! is_array($parts) || ! in_array($parts['scheme'] ?? '', ['http', 'https'], true) || isset($parts['user'], $parts['pass']) || isset($parts['user']) || isset($parts['query']) || isset($parts['fragment']) || ! in_array($parts['path'] ?? '', ['', '/'], true)) {
            throw new InvalidArgumentException('Target must be an HTTP(S) origin without credentials, path, query or fragment.');
        }
        $host = strtolower(trim($parts['host'] ?? '', '[]'));
        $port = $parts['port'] ?? ($parts['scheme'] === 'https' ? 443 : 80);
        if ($host === '' || $port < 1) {
            throw new InvalidArgumentException('Invalid target host or port.');
        }
        $canonical = rtrim($origin, '/');
        if (! in_array($canonical, array_map(fn ($s) => rtrim($s, '/'), $this->settings['allowed_origins']), true)) {
            throw new InvalidArgumentException('Target origin is not in storm.security.allowed_origins.');
        }
        $ips = $this->resolve($host);
        if ($ips === []) {
            throw new InvalidArgumentException('Target DNS resolution failed.');
        }
        foreach ($ips as $ip) {
            $loopback = $ip === '::1' || str_starts_with($ip, '127.');
            $public = filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false;
            $metadata = $ip === '169.254.169.254' || str_starts_with($ip, '169.254.') || str_starts_with(strtolower($ip), 'fe80:');
            if ($metadata || (! $loopback && ! $public && ! in_array($canonical, $this->settings['allowed_private_origins'] ?? [], true))) {
                throw new InvalidArgumentException('Private/reserved target address requires explicit approval; link-local addresses are forbidden.');
            }
        }

        return ['origin' => $canonical, 'host' => $host, 'port' => $port, 'ip' => $ips[0]];
    }

    public function resolve(string $host): array
    {
        if (filter_var($host, FILTER_VALIDATE_IP)) {
            return [$host];
        }
        $records = @dns_get_record($host, DNS_A | DNS_AAAA);
        $ips = [];
        foreach ($records ?: [] as $record) {
            if (isset($record['ip']) || isset($record['ipv6'])) {
                $ips[] = $record['ip'] ?? $record['ipv6'];
            }
        }
        if ($host === 'localhost' && $ips === []) {
            $ips = ['127.0.0.1'];
        }

        return array_values(array_unique($ips));
    }
}
