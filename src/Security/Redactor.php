<?php

namespace AmrAchraf\LaravelStorm\Security;

final class Redactor
{
    private array $secrets = [];

    public function __construct(private array $capture = []) {}

    public static function sensitive(string $key): bool
    {
        return (bool) preg_match('/password|passwd|secret|token|authorization|cookie|api[-_]?key|csrf|credential/i', $key);
    }

    public function registerSecret(string $value): void
    {
        if ($value !== '') {
            if (! isset($this->secrets[$value]) && count($this->secrets) >= 4096) {
                throw new \RuntimeException('Secret-redaction registry limit reached; reduce dynamic extraction or run duration.');
            }
            $this->secrets[$value] = true;
        }
    }

    public function text(string $value): string
    {
        foreach (array_keys($this->secrets) as $secret) {
            $value = str_replace([$secret, rawurlencode($secret), urlencode($secret)], '[REDACTED]', $value);
        }

        return $value;
    }

    public function clean(mixed $value): mixed
    {
        if (is_string($value)) {
            return $this->text($value);
        }
        if (! is_array($value)) {
            return $value;
        }
        $result = [];
        foreach ($value as $key => $item) {
            $result[$key] = self::sensitive((string) $key) ? '[REDACTED]' : $this->clean($item);
        }

        return $result;
    }

    public function headers(array $headers): array
    {
        $allowed = array_map('strtolower', $this->capture['headers'] ?? []);
        $out = [];
        foreach ($headers as $key => $value) {
            if (in_array(strtolower($key), $allowed, true) && ! self::sensitive($key)) {
                $out[strtolower($key)] = $this->clean($value);
            }
        }

        return $out;
    }

    public function event(array $event): array
    {
        $safe = $this->clean($event);
        // Correlation IDs are random identifiers, never interpolated credentials.
        if (isset($event['trace_id']) && preg_match('/^[A-Za-z0-9_-]{8,64}$/', $event['trace_id'])) {
            $safe['trace_id'] = $event['trace_id'];
        }

        return $safe;
    }

    public function body(string $body, string $contentType, bool $enabled): ?array
    {
        if (! $enabled || ! ($this->capture['enabled'] ?? false)) {
            return null;
        }
        $max = min(16384, $this->capture['max_bytes'] ?? 16384);
        // Parse complete small JSON/form bodies only. Never persist arbitrary text.
        if (strlen($body) > $max) {
            return ['omitted' => 'body exceeds capture limit'];
        }
        if (str_contains(strtolower($contentType), 'application/json')) {
            $decoded = json_decode($body, true);
        } elseif (str_contains(strtolower($contentType), 'application/x-www-form-urlencoded')) {
            parse_str($body, $decoded);
        } else {
            return null;
        }
        if (! is_array($decoded)) {
            return null;
        }
        $out = [];
        foreach ($this->capture['fields'] ?? [] as $field) {
            if (! self::sensitive($field) && array_key_exists($field, $decoded)) {
                $out[$field] = $this->clean($decoded[$field]);
            }
        }

        return $out;
    }
}
