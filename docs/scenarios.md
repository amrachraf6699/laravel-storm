# Scenarios

Scenario JSON has `schema_version: 1`, `name`, `origin`, `engine`, `steps`, `workload`, optional `thresholds`, `capture`, `diagnostics`, and non-secret `environment` labels. See [products](../examples/products.json) and [checkout](../examples/checkout.json).

Each request step has a unique short `name`, `method` (`GET`/`POST`), absolute relative `path`, optional `headers`, either structured `json` or `form`, `expected_status` (integer array, default `[200]`), `timeout` (seconds, max 60), `think_time` (seconds), and `extract` rules.

Extractors use `source: json` with a dotted path, `source: header` with a header name, or `source: css` with a selector in `path` and optional `attribute`. CSS extraction without an attribute returns text. Missing/oversized extracted values fail the check and end that iteration. They never become executable code.

Use `{{env.VARIABLE_NAME}}` for credentials and `{{variable}}` for extracted values. Paths URL-encode substituted values; headers and bodies retain their scalar values. Environment values are resolved in the supervisor, passed to the worker through stdin, and passed to k6 through its child environment. Restart the supervisor after changing its environment. Do not put secrets in literal paths, labels, or arbitrary fields; known secret field names reject literal credentials.

VU cookies and extracted variables are isolated. Each iteration starts a fresh journey and cookie jar. There is no browser/JavaScript rendering, user-supplied scripting, OAuth automation, or external feeder support.

## Workloads

| Mode | Engine | Fields |
|---|---|---|
| `fixed-vus` | Both | `vus`, `duration` |
| `ramping-vus` | Both | Initial `vus`, `max_vus`, `stages` |
| `spike` | Both | Initial `vus`, `max_vus`, `duration`; generates bounded rise/hold/recovery stages |
| `constant-arrival-rate` | k6 | `rate`, `duration`, preallocated `vus`, `max_vus` |
| `ramping-arrival-rate` | k6 | Initial `rate`, preallocated `vus`, `max_vus`, `stages` |

Stages contain `duration` and `target`. Durations accept numeric seconds or strings such as `500ms`, `30s`, `2m`. The stage sum determines ramping workload duration. `rps_limit` caps total initiated HTTP traffic. Arrival rates are iterations/second; validation accounts for every step when checking the requested rate against the ceiling. Dropped iterations remain visible.

Thresholds contain `metric`, `operator` (`lt`, `lte`, `gt`, `gte`), and numeric `value`; optional `stage` selects a zero-based stage. Metrics are `p50_ms`, `p95_ms`, `p99_ms`, `http_error_rate`, `transport_error_rate`, and `check_error_rate`. Rates are fractions: `0.01` means 1%. No observations fails a requested threshold rather than passing it.

```bash
php artisan storm:scenario:import path/to/scenario.json
php artisan storm:scenario:export SCENARIO_ID --output=scenario.json
php artisan storm:test --scenario=SCENARIO_ID --fail-on-threshold
```
