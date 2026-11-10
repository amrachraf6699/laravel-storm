# Diagnostics and body capture

Both features are off by default and change measurement overhead.

## Laravel diagnostics

Set `diagnostics.enabled=true` on the **target** and provision a shared `STORM_DIAGNOSTICS_KEY` of at least 32 random characters on target and generator. Opt the scenario into diagnostics. Explicitly attach the middleware only to routes approved for measurement:

```php
use AmrAchraf\LaravelStorm\Diagnostics\StormMiddleware;

Route::middleware(StormMiddleware::class)->group(function () {
    // Your approved fixture routes.
});
```

Signed contexts expire after two minutes and only selected requests receive them (1% by default). Middleware measures Laravel duration, query count/time, request memory delta, process peak memory, and exception class. It never records SQL bindings or stack traces. Query counters belong to request attributes and are removed afterward, including under persistent workers.

The target writes bounded, nonblocking-lock spool records. The local supervisor ingests them. The inspector joins diagnostic samples by run/trace ID where a matching request sample was retained; other diagnostic samples remain in dedicated storage. Missing diagnostics do not mean a request executed no queries.

For a remote target, configure `STORM_DIAGNOSTICS_RELAY_URL` to the generator's `/storm/api/diagnostics` collector over HTTPS or a loopback SSH tunnel and run `php artisan storm:diagnostics:relay` on the target in a separate process. Do not simultaneously run local ingestion and remote relay on the same spool. Batches use HMAC authentication, timestamps, quotas, and idempotent run/trace keys. Provision the same signing key explicitly; it does not enable control-plane login.

Spool/ingestion failures drop diagnostic samples without failing application requests. Compare instrumentation on/off against controlled fixtures and record external CPU/network telemetry; sampled duration is not system-wide root-cause proof. Process peak memory in persistent workers is not a request-exclusive peak.

## Body capture

Set `capture.enabled=true`, configure a small explicit `capture.fields` allowlist, then opt the scenario into `capture: true`. Only small complete JSON and form bodies are parsed. The retained limit is 16 KiB or the configured smaller limit. Oversized, unsupported text, HTML, and binary bodies are omitted.

Sensitive key names are always denied, known environment/extracted values are redacted, and header capture has a separate allowlist. The default header allowlist contains content type/length only. Cookie jars, credentials, raw SQL, and arbitrary response headers are not saved. Redaction applies before storage and export. Treat allowlisted fields as potentially sensitive; prefer synthetic fixtures and short retention.
