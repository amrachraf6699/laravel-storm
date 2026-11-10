<?php

namespace AmrAchraf\LaravelStorm\Security;

use AmrAchraf\LaravelStorm\Storage\Store;
use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Http\Request;

final class Access
{
    public function __construct(private Store $store, private Gate $gate) {}

    public function issue(): string
    {
        $token = bin2hex(random_bytes(32));
        $this->store->meta('login_token', ['hash' => hash('sha256', $token), 'expires' => time() + 300], true);

        return $token;
    }

    public function exchange(Request $request, string $token): bool
    {
        if (! $this->isLocal($request) || ! preg_match('/^[a-f0-9]{64}$/', $token)) {
            return false;
        }
        // Consume exactly once atomically, even when two login requests race.
        $db = $this->store->db();
        $db->exec('BEGIN IMMEDIATE');
        try {
            $stored = $this->store->meta('login_token');
            if (! is_array($stored) || $stored['expires'] < time() || ! hash_equals($stored['hash'], hash('sha256', $token))) {
                $db->exec('ROLLBACK');

                return false;
            }
            $this->store->meta('login_token', null, true);
            $db->exec('COMMIT');
        } catch (\Throwable $e) {
            $db->exec('ROLLBACK');
            throw $e;
        }
        $request->session()->regenerate();
        $request->session()->put('storm_authenticated_until', time() + 3600);

        return true;
    }

    public function allowed(Request $request): bool
    {
        if ($this->isLocal($request) && $request->session()->get('storm_authenticated_until', 0) > time()) {
            return true;
        }

        return $request->user() !== null && $this->gate->forUser($request->user())->allows('viewStorm');
    }

    public function isLocal(Request $request): bool
    {
        return app()->environment(['local', 'testing']) && in_array($request->server('REMOTE_ADDR'), ['127.0.0.1', '::1'], true);
    }
}
