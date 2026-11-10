# Reports and measurement

`storm:report RUN_ID` exports versioned JSON. `--format=html` creates a standalone, escaped report; `--output=FILE` writes it. `--compare=OTHER_ID` compares two reports and warns about changed engine, origin, steps, load, environment, capture, or diagnostics. This is an observed difference, not a significance test.

Counts are based on engine observations, not retained samples. `started_requests` counts initiations; `completed_requests` counts finished attempts including transport failures. In-flight requests cancelled before completion can leave starts greater than completions.

`http_error_rate` uses HTTP 4xx/5xx divided by HTTP responses. Unexpected expected-status checks are separate and may overlap HTTP errors. `transport_error_rate` uses transport failures divided by completed attempts; timeouts are a subset. `check_error_rate` divides status/extraction check failures by HTTP responses. Empty denominators are null. Expected redirects are measured as responses and are not followed.

Latency percentiles include every duration available from the engine, including failed attempts, and use mergeable 1% logarithmic buckets. They are approximate upper bucket bounds, never averages of per-interval percentiles. Mean latency uses original observations. PHP cURL transfer timings include connection setup; k6 request duration excludes it. Missing fields stay null/absent.

Buckets use completion time; stage thresholds classify observations by their completion stage. Late responses can fall into the next stage or final drain. Partial runs include only observed data, so use caution comparing their throughput with completed runs. Recovered reports identify missing unflushed data and rounded elapsed boundaries.

RPS is completed attempts divided by the measured elapsed window; report configuration, engine, workload, target fixtures, generator resources, and repeated-run variance alongside any number. Do not interpret configured VUs as an exact supported number of real human users.
