# Laravel Storm

**Controlled load. Clear signals.**

Laravel-native load testing with a PHP engine, optional Grafana k6, a live Vue dashboard, sampled request visualization, and opt-in Laravel diagnostics.

[![CI](https://github.com/amrachraf6699/laravel-storm/actions/workflows/ci.yml/badge.svg)](https://github.com/amrachraf6699/laravel-storm/actions/workflows/ci.yml)
[![Packagist](https://img.shields.io/packagist/v/amrachraf6699/laravel-storm)](https://packagist.org/packages/amrachraf6699/laravel-storm)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Requirements

| Framework | PHP | Platforms |
|---|---|---|
| Laravel 12 | 8.2–8.5 | Windows, Linux |
| Laravel 13 | 8.3–8.5 | Windows, Linux |

Requires cURL, DOM, mbstring, PDO SQLite, writable private storage, and process spawning. k6 **2.3.0** is optional and installed separately. Consumers do not need Node, Redis, queues, or database migrations in their application's primary database.

## Quick start

```bash
composer require amrachraf6699/laravel-storm:^0.1 --dev
php artisan storm:install
```

Set `STORM_ENABLED=true` in your application environment. Review the exact approved origins in `config/storm.php`. Keep the application running separately, for example on `http://127.0.0.1:8000`.

```bash
php artisan storm:doctor
php artisan storm:test --url=http://127.0.0.1:8000/api/products --users=10 --duration=30s
```

For the dashboard:

```bash
php artisan storm:serve
```

In another terminal run `php artisan storm:login`, then visit **`/storm`** in your existing Laravel application and enter the single-use token. `storm:serve` supervises workers; it does not start an HTTP server. Local tokens require a local/testing environment and a loopback browser connection. On staging, use application login and the `viewStorm` gate instead.

## What ships

- PHP async and optional k6 engines; fixed/ramping VUs, spikes, and k6 arrival-rate workloads.
- Dynamic GET/POST journeys with per-VU cookies, environment references, JSON/header/CSS extraction, and think time.
- Actual completed RPS, HTTP-status distribution, transport failures, approximate P50/P95/P99, and whole-run/stage thresholds.
- Persistent run history, cancellation, interrupted-run recovery, separate SQLite storage, and retention.
- Sampled Canvas traffic, request inspector, opt-in allowlisted JSON/form body capture, and signed sampled Laravel diagnostics.
- JSON/HTML reports, two-run comparison, and versioned scenario import/export.

## Scenarios and reports

Save a JSON scenario using the dashboard, or start from [the examples](examples). Run it directly:

```bash
php artisan storm:test --scenario=examples/products.json --engine=php --fail-on-threshold
php artisan storm:test --scenario=examples/products.json --engine=k6
php artisan storm:list
php artisan storm:status RUN_ID
php artisan storm:stop RUN_ID
php artisan storm:report RUN_ID --format=json --output=report.json
php artisan storm:report RUN_ID --format=html --output=report.html
php artisan storm:report RUN_ID --compare=OTHER_RUN_ID
php artisan storm:prune --days=7
```

Exit codes: `0` success; `1` execution/configuration failure; `2` completed run failing thresholds when `--fail-on-threshold` is supplied; `130` cancellation. Threshold failure is separate from execution failure.

## Measurement boundaries

Run the generator on separate resources for credible capacity measurements. The embedded dashboard, collector, and optional instrumentation add overhead when they share target hardware. Storm does not infer a universal maximum user count or guarantee root causes.

Percentiles use mergeable logarithmic buckets with at most 1% relative bucket error plus 0.001 ms near zero. PHP's cURL transfer latency includes connection setup; k6's `http_req_duration` measures sending, waiting, and receiving. Cross-engine comparisons disclose this difference. Samples do not determine aggregate rates or percentiles.

k6 uses a global request-rate **safety ceiling** as well as its selected executor. Reaching that ceiling can constrain the intended workload. Arrival rate means journey iterations per second, not HTTP requests per second. k6 response-size checks happen after buffering; use bounded fixture responses for extraction/capture. External CPU/network telemetry is still needed to rule out generator saturation.

Only test approved systems. Defaults allow two exact local origins, one active run, 100 VUs, 100 request starts/second, and 300 seconds. See [security](docs/security.md) before enabling staging or capture.

## Documentation

- [Installation and staging access](docs/installation.md)
- [Scenarios and workload semantics](docs/scenarios.md)
- [Engines and process lifecycle](docs/engines.md)
- [Diagnostics and payload capture](docs/diagnostics.md)
- [Reports and measurement](docs/reports.md)
- [Security and retention](docs/security.md)
- [Development and validation](CONTRIBUTING.md)
- [Publishing on Packagist](docs/publishing.md)

Licensed under [MIT](LICENSE). Dashboard dependencies retain their licenses in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
