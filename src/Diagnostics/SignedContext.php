<?php

namespace AmrAchraf\LaravelStorm\Diagnostics;

final class SignedContext
{
    public static function issue(string $run, string $trace, string $key): string
    {
        $payload = json_encode(['run_id' => $run, 'trace_id' => $trace, 'expires' => time() + 120], JSON_THROW_ON_ERROR | JSON_UNESCAPED_SLASHES);
        $encoded = rtrim(strtr(base64_encode($payload), '+/', '-_'), '=');

        return $encoded.'.'.hash_hmac('sha256', $encoded, $key);
    }

    public static function verify(string $token, string $key): ?array
    {
        if (strlen($token) > 1024 || strlen($key) < 32) {
            return null;
        }
        $parts = explode('.', $token);
        if (count($parts) !== 2 || ! hash_equals(hash_hmac('sha256', $parts[0], $key), $parts[1])) {
            return null;
        }
        $payload = json_decode(base64_decode(strtr($parts[0], '-_', '+/'), true) ?: '', true);
        if (! is_array($payload) || ! preg_match('/^[a-f0-9]{32}$/', $payload['run_id'] ?? '') || ! preg_match('/^[a-zA-Z0-9_-]{8,64}$/', $payload['trace_id'] ?? '') || ! is_int($payload['expires'] ?? null) || $payload['expires'] < time() || $payload['expires'] > time() + 130) {
            return null;
        }

        return $payload;
    }
}
