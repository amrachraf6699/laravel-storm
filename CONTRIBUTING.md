# Contributing

```bash
composer install
npm ci
composer test
composer lint
composer analyse
npm run build
```

Use Node 24 LTS for dashboard development. PHP 8.2+ and Laravel 12/13 are supported; dependency resolution chooses a compatible Orchestra Testbench version. Install optional k6 2.3.0 and set `STORM_K6_BINARY` to run real k6 tests. CI requires these tests instead of skipping them.

Tests launch a concurrent local Node HTTP fixture. They validate counts, errors, histograms, authentication, target policy, dynamic login/CSRF journeys, cancellation, and isolated diagnostics. No public service is load-tested. Test artifacts live under ignored `.cache`.

For browser checks, run `npx playwright install chromium`, then `npx playwright test`. The test starts the workbench, logs in with a single-use token, launches a measured run, inspects samples, exports HTML, compares reports, and checks the mobile layout. On a local Windows machine with Edge, set `STORM_BROWSER_CHANNEL=msedge` to use it.

To explore the workbench manually, create its private storage/bootstrap cache directories, set a random Laravel `APP_KEY` and `APP_ENV=local`, then run `php -S 127.0.0.1:8000 -t workbench/public workbench/server.php`. Run `php workbench/artisan storm:serve` and `php workbench/artisan storm:login` in other terminals.

Preserve measurement correctness, bounded resources, and secret handling when adding engine capabilities. Keep request timing differences visible. Do not add fabricated metrics or visual traffic. Keep compiled dashboard assets current and preserve third-party notices.
