# Engines and supervision

The PHP engine supports Guzzle 7.9+ and 8.3+ using cURL multi asynchronous I/O. It does not launch a process per VU. A VU executes one step at a time; think time and multiple steps mean configured VUs are not equal to in-flight concurrency. Successful responses, failures, and observed timings are aggregated before sampling. There are no automatic application-level retries or redirect following.

The optional k6 engine generates a data-only script for verified **k6 2.3.0**. Obtain the binary from [Grafana's release](https://github.com/grafana/k6/releases/tag/v2.3.0), verify its checksum, and put it on PATH or set `STORM_K6_BINARY`. The binary is not redistributed by Storm. Raw metric/sample files have disk quotas and are deleted after normal engine shutdown; pruning cleans interrupted artifacts.

k6 sends granular JSON metrics and a separate capped sample channel. Script-side redaction precedes sample logging. Arbitrary k6 scripts are not accepted. Timing and executor differences are disclosed in reports. The k6 global RPS setting is a safety ceiling, not a precise open-model scheduler.

## Lifecycle

Run states are `pending`, `starting`, `running`, `stopping`, `completed`, `cancelled`, and `failed`. Performance outcomes are independently `passed`, `failed`, or `not_evaluated`.

The supervisor owns each worker; the k6 worker additionally owns its external executable. Stop requests are idempotent and available through CLI when the UI is down. Workers poll cancellation, flush partial metrics, and terminate gracefully before bounded escalation. Windows process creation times and Linux process start ticks are checked alongside unique run markers before stale-process cleanup. PIDs alone are insufficient.

An application/web-worker restart does not terminate the separate supervisor. After a supervisor/worker interruption, restart `storm:serve`; stale heartbeats trigger recovery and a partial report from persisted buckets. Unflushed observations may be missing. Runs interrupted during request drain cannot establish capacity. A hard-killed worker may leave k6 alive until its configured duration/deadline or supervisor recovery; restart the supervisor promptly.

Only Windows and Linux are supported. Native process-memory visibility varies; use external generator CPU/network monitoring for credible benchmarks. PHP response limits abort transfers; k6 body limits are checked after buffering, so extraction/capture should use bounded trusted response fixtures.
