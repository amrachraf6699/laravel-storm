# Security and operating limits

Storm is a development/staging tool for systems you are authorized to test. It is disabled by default. Review configuration before enabling it.

- Use exact approved HTTP(S) origins. Loopback examples default to port 8000; other ports/origins require explicit configuration. Private network targets need additional approval. Link-local metadata targets are blocked.
- DNS resolution is validated and pinned, TLS verification stays enabled, proxies are disabled for generated test traffic, and redirects are disabled. Describe expected redirects as explicit scenario steps.
- Defaults: one active run, 100 VUs, 100 request starts/second, 300 seconds, 1 MiB PHP response limit, 100 MiB artifact quota, and 512 MiB worker memory limit. Raising limits is an operator configuration decision. k6 buffers extraction/capture responses before size checks; use bounded trusted fixtures.
- Keep `web` middleware and CSRF protection on dashboard routes. Local login tokens only work from loopback in local/testing; staging requires application authentication and the `viewStorm` authorization gate.
- Do not put credentials in literal scenario fields or URLs. Use environment references. Store private results outside the public root. Protect the application key, diagnostic signing key, OS account, and process environment.
- Default body capture is off. Opt-in fields must contain synthetic non-sensitive data. JSON/HTML reports and SQLite files remain private operational artifacts even after redaction.
- Use `storm:stop RUN_ID` for cancellation and `storm:serve --once` to recover stale workers. Verify owned processes have stopped after a machine or supervisor interruption.
- Run `storm:prune --days=7` regularly. Terminal run deletion cascades to buckets/samples/diagnostics. Scenarios and published config are retained; uninstall does not automatically delete data.

For vulnerability reports, see [SECURITY.md](../SECURITY.md).
