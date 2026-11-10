# Installation

Supports Laravel 10–13 on Windows and Linux. Storm requires PHP 8.2+; Laravel 13 requires PHP 8.3+. Laravel 10 applications running PHP 8.1 must upgrade PHP before installing Storm. See the [requirements matrix](../README.md#requirements) for tested PHP versions.

Install with Composer as a development dependency, run `storm:install`, and set `STORM_ENABLED=true`. The service provider and commands are discovered automatically. Installation publishes configuration and initializes `storage/storm/storm.sqlite`; it does not run host database migrations.

The package remains inactive when disabled. Application configuration caching applies normally: clear/rebuild it after changing environment settings.

## Dashboard access

Your application's normal web server serves `/storm`. `storm:serve` is a separate foreground CLI supervisor. Keep it running for dashboard-created workloads. `storm:test` supplies its own supervision when no supervisor is running, or waits for the existing supervisor.

In local/testing, `storm:login` prints a single-use five-minute token. Enter it in the login form; it becomes a one-hour session. Tokens are stored hashed, are not accepted remotely, and mutations require CSRF protection. Keep the configured `web` middleware.

On staging, sign in through the application's auth guard and define the gate in an application service provider:

```php
use Illuminate\Support\Facades\Gate;

Gate::define('viewStorm', fn ($user) => $user->is_performance_admin === true);
```

Choose an authorization condition that exists in your application. The gate denies access until you define it. Do not publicly expose the development application or supervisor.

## Target configuration

Origins include scheme and port; paths belong to scenario steps. Add an approved staging origin to `security.allowed_origins`. A private-network staging address also needs that exact origin in `security.allowed_private_origins`. Link-local and metadata addresses remain forbidden. DNS results are checked and pinned for each run; redirects are disabled.

Run `storm:doctor` to inspect PHP extensions, process support, storage, supervisor heartbeat, and available engines. k6 must report exactly version 2.3.0 for this release; configure `STORM_K6_BINARY` when it is outside PATH.

## Removal

Stop active runs and the supervisor before removing the Composer dependency. Results and published configuration are preserved. Delete private Storm storage deliberately after exporting any reports you need. Never expose that directory through the public web root.
