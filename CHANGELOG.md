# Changelog

## v0.1.0

Initial Laravel 12/13 release for Windows and Linux.

- PHP asynchronous and optional k6 2.3.0 engines, fixed/ramping/spike VUs, and k6 arrival-rate executors.
- Dynamic GET/POST scenarios, per-VU cookies, environment references, and JSON/header/CSS extraction.
- Separate SQLite results, supervised workers, cancellation, recovery, approximate mergeable percentiles, and thresholds.
- Embedded Vue dashboard with polling, measured request samples, bounded Canvas traffic, request inspector, comparisons, and JSON/HTML reports.
- Opt-in allowlisted body capture and signed sampled Laravel diagnostics with local spool and remote relay.
- Target approval, DNS pinning, runtime limits, local token or application-gate authorization, retention, tests, and compatibility CI.

Known boundaries: shared-host measurements add overhead; k6 and cURL expose different latency boundaries; k6 extraction/capture size checks occur after buffering; generator CPU saturation requires external telemetry. Distributed orchestration, browser automation, and hosted services are outside this release.
