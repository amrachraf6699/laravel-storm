BEGIN IMMEDIATE;
CREATE TABLE IF NOT EXISTS storm_runs (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, engine TEXT NOT NULL, status TEXT NOT NULL,
    performance_outcome TEXT, config_json TEXT NOT NULL, created_at TEXT NOT NULL,
    started_at TEXT, finished_at TEXT, heartbeat_at REAL, nonce TEXT NOT NULL,
    process_json TEXT, report_json TEXT, error_code TEXT
);
CREATE INDEX IF NOT EXISTS storm_runs_status ON storm_runs(status);
CREATE TABLE IF NOT EXISTS storm_scenarios (id TEXT PRIMARY KEY, config_json TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS storm_metric_buckets (
    run_id TEXT NOT NULL REFERENCES storm_runs(id) ON DELETE CASCADE,
    elapsed_second INTEGER NOT NULL, data_json TEXT NOT NULL,
    PRIMARY KEY(run_id, elapsed_second)
);
CREATE TABLE IF NOT EXISTS storm_request_samples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    run_id TEXT NOT NULL REFERENCES storm_runs(id) ON DELETE CASCADE, data_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS storm_samples_run ON storm_request_samples(run_id, id);
CREATE TABLE IF NOT EXISTS storm_diagnostic_samples (
    run_id TEXT NOT NULL REFERENCES storm_runs(id) ON DELETE CASCADE,
    trace_id TEXT NOT NULL, data_json TEXT NOT NULL, PRIMARY KEY(run_id, trace_id)
);
CREATE TABLE IF NOT EXISTS storm_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
INSERT OR IGNORE INTO storm_schema(version) VALUES (1);
COMMIT;
