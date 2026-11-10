export type Scenario = {
  schema_version: number; name: string; engine: string; origin: string;
  steps: Array<Record<string, unknown>>;
  workload: Record<string, unknown>;
  thresholds?: Array<Record<string, unknown>>; capture?: boolean; diagnostics?: boolean;
};
export type Bucket = { elapsed_second: number; completed_rps: number; completed_requests: number; http_errors: number; transport_errors: number; latency: { p50_ms: number | null; p95_ms: number | null; p99_ms: number | null }; samples_retained: number; samples_dropped: number };
export type Sample = { cursor: number; method: string; endpoint: string; status_code: number | null; duration_ms: number; error_type?: string; diagnostics?: Record<string, unknown> | null; [key: string]: unknown };
export type Report = { summary: Bucket & Record<string, unknown>; warnings: string[]; limitations: string[]; thresholds: Array<Record<string, unknown>>; performance_outcome: string; [key: string]: unknown };
export type Run = { id: string; name: string; engine: string; status: string; created_at: string; performance_outcome: string | null; configuration: Scenario; report: Report | null };
export type Engine = { name: string; available: boolean; modes: string[]; version: string | null; reason: string | null };
export type Doctor = { supervisor_online: boolean; engines: Engine[]; [key: string]: unknown };
