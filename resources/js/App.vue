<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { api, base, download } from './api';
import type { Bucket, Doctor, Run, Sample, Scenario } from './types';
import Traffic from './Traffic.vue';
import Chart from './Chart.vue';

const page = ref('overview'), runs = ref<Run[]>([]), selected = ref<Run | null>(null), buckets = ref<Bucket[]>([]), samples = ref<Sample[]>([]);
const inspector = ref<Sample | null>(null), doctor = ref<Doctor | null>(null), error = ref(''), notice = ref(''), busy = ref(false);
const saved = ref<Array<{ id: string; configuration: Scenario }>>([]), compareLeft = ref(''), compareRight = ref(''), comparison = ref<unknown>(null);
const defaultScenario: Scenario = { schema_version: 1, name: 'Products API', engine: 'php', origin: 'http://127.0.0.1:8000', steps: [{ name: 'products', method: 'GET', path: '/api/products', expected_status: [200] }], workload: { mode: 'fixed-vus', vus: 10, max_vus: 10, duration: '30s' }, thresholds: [{ metric: 'p95_ms', operator: 'lt', value: 500 }], capture: false, diagnostics: false };
const form = ref<Scenario>(structuredClone(defaultScenario)), advanced = ref(false), editor = ref('');
const active = computed(() => !!selected.value && ['pending', 'starting', 'running', 'stopping'].includes(selected.value.status));
const latest = computed(() => buckets.value.at(-1));
const summary = computed(() => selected.value?.report?.summary ?? null);
const completed = computed(() => summary.value?.completed_requests ?? buckets.value.reduce((n, b) => n + b.completed_requests, 0));
const transport = computed(() => summary.value?.transport_errors ?? buckets.value.reduce((n, b) => n + b.transport_errors, 0));
const httpErrors = computed(() => summary.value?.http_errors ?? buckets.value.reduce((n, b) => n + b.http_errors, 0));
const sampleDrops = computed(() => summary.value?.samples_dropped ?? buckets.value.reduce((n, b) => n + b.samples_dropped, 0));
const p95 = computed(() => summary.value?.latency.p95_ms ?? latest.value?.latency.p95_ms);
const currentModes = computed(() => doctor.value?.engines.find(e => e.name === form.value.engine)?.modes ?? ['fixed-vus', 'ramping-vus', 'spike']);
let timer: ReturnType<typeof setTimeout> | undefined, stopped = false, cursor = 0, selectedGeneration = 0;
function number(value: unknown, digits = 0): string { return typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: digits }) : '—'; }
function terminal(status: string): boolean { return ['completed', 'cancelled', 'failed'].includes(status); }
async function action(fn: () => Promise<void>) { error.value = ''; notice.value = ''; busy.value = true; try { await fn(); } catch (e) { error.value = e instanceof Error ? e.message : 'The operation failed.'; } finally { busy.value = false; } }
async function refresh() {
  if (document.hidden) return;
  const [history, health] = await Promise.all([api<Run[]>('runs'), api<Doctor>('doctor')]);
  runs.value = history; doctor.value = health;
  if (selected.value) {
    const id = selected.value.id, generation = selectedGeneration;
    const after = Math.max(-1, (buckets.value.at(-1)?.elapsed_second ?? 0) - 1);
    const [run, metrics, incoming] = await Promise.all([api<Run>(`runs/${id}`), api<Bucket[]>(`runs/${id}/metrics?after=${after}`), api<Sample[]>(`runs/${id}/samples?after=${cursor}`)]);
    if (generation !== selectedGeneration) return;
    selected.value = run;
    const merged = new Map(buckets.value.map(b => [b.elapsed_second, b])); metrics.forEach(b => merged.set(b.elapsed_second, b));
    buckets.value = [...merged.values()].sort((a, b) => a.elapsed_second - b.elapsed_second).slice(-1000);
    if (incoming.length) { cursor = incoming.at(-1)!.cursor; samples.value = [...samples.value, ...incoming].slice(-500); }
  }
}
async function poll() { if (stopped) return; try { await refresh(); } catch (e) { error.value = e instanceof Error ? e.message : 'Connection unavailable; retrying.'; } timer = setTimeout(poll, active.value ? 1000 : 5000); }
async function select(run: Run) { selectedGeneration++; selected.value = run; buckets.value = []; samples.value = []; cursor = 0; inspector.value = null; page.value = 'overview'; await action(refresh); }
function newTest() { form.value = structuredClone(defaultScenario); advanced.value = false; page.value = 'create'; }
function toggleAdvanced() { if (!advanced.value) editor.value = JSON.stringify(form.value, null, 2); else { try { form.value = JSON.parse(editor.value); } catch { error.value = 'Fix the scenario JSON before switching back.'; return; } } advanced.value = !advanced.value; }
function config(): Scenario { return advanced.value ? JSON.parse(editor.value) as Scenario : form.value; }
async function start() { await action(async () => { const run = await api<Run>('runs', config()); selectedGeneration++; selected.value = run; buckets.value = []; samples.value = []; cursor = 0; page.value = 'overview'; await refresh(); }); }
async function save() { await action(async () => { await api('scenarios', config()); saved.value = await api('scenarios'); notice.value = 'Scenario saved with credential references.'; }); }
async function stop() { if (!selected.value) return; await action(async () => { selected.value = await api<Run>(`runs/${selected.value!.id}/stop`, {}); }); }
async function importFile(event: Event) { const file = (event.target as HTMLInputElement).files?.[0]; if (!file) return; await action(async () => { if (file.size > 1048576) throw new Error('Scenario exceeds 1 MiB.'); const imported = JSON.parse(await file.text()); await api('scenarios', imported); form.value = imported; editor.value = JSON.stringify(imported, null, 2); advanced.value = true; saved.value = await api('scenarios'); notice.value = 'Scenario imported and validated.'; }); }
async function compare() { await action(async () => { comparison.value = await api(`compare/${compareLeft.value}/${compareRight.value}`); }); }
function loadJourney() {
  form.value = { ...structuredClone(defaultScenario), name: 'Authenticated checkout', steps: [
    { name: 'csrf', method: 'GET', path: '/login', expected_status: [200], extract: { csrf: { source: 'css', path: 'input[name="_token"]', attribute: 'value' } } },
    { name: 'login', method: 'POST', path: '/login', form: { email: '{{env.STORM_TEST_EMAIL}}', password: '{{env.STORM_TEST_PASSWORD}}', _token: '{{csrf}}' }, expected_status: [302] },
    { name: 'checkout', method: 'POST', path: '/api/orders', json: { product_id: 1 }, expected_status: [201], extract: { orderId: { source: 'json', path: 'id' } } },
  ] }; editor.value = JSON.stringify(form.value, null, 2); advanced.value = true;
}
function loadSaved(scenario: Scenario) { form.value = structuredClone(scenario); editor.value = JSON.stringify(form.value, null, 2); advanced.value = true; }
onMounted(async () => { await action(async () => { saved.value = await api('scenarios'); await refresh(); }); void poll(); });
onUnmounted(() => { stopped = true; clearTimeout(timer); });
</script>

<template>
  <div class="shell">
    <aside class="sidebar">
      <a class="brand" href="#" @click.prevent="page = 'overview'"><span class="brand-mark">ϟ</span><span>storm<span class="brand-dot">.</span><small>FOR LARAVEL</small></span></a>
      <div class="nav-label">WORKSPACE</div>
      <nav aria-label="Main navigation">
        <button :class="{ chosen: page === 'overview' }" @click="page = 'overview'"><span>◫</span> Overview</button>
        <button :class="{ chosen: page === 'create' }" @click="newTest"><span>＋</span> Create test</button>
        <button :class="{ chosen: page === 'reports' }" @click="page = 'reports'"><span>▤</span> Reports & compare</button>
        <button :class="{ chosen: page === 'settings' }" @click="page = 'settings'"><span>⚙</span> Environment</button>
      </nav>
      <div class="sidebar-note"><span class="live-dot" :class="{ off: !doctor?.supervisor_online }"></span>{{ doctor?.supervisor_online ? 'Supervisor online' : 'Supervisor offline' }}<p v-if="!doctor?.supervisor_online">Start <code>php artisan storm:serve</code> to launch dashboard runs.</p></div>
      <div class="sidebar-bottom"><span class="badge">v0.1.0</span><p>Controlled load.<br>Clear signals.</p><a href="https://github.com/amrachraf6699/laravel-storm" target="_blank" rel="noopener noreferrer">Documentation ↗</a></div>
    </aside>
    <main>
      <header class="topbar"><div class="breadcrumb">Workspace <span>/</span> {{ page === 'create' ? 'New test' : page === 'settings' ? 'Environment' : page === 'reports' ? 'Reports' : 'Overview' }}</div><span class="top-tag">DEVELOPER TOOLS <span>↗</span></span></header>
      <div class="content">
        <div v-if="error" class="alert error" role="alert">{{ error }}<button aria-label="Dismiss error" @click="error = ''">×</button></div>
        <div v-if="notice" class="alert" role="status">{{ notice }}</div>

        <template v-if="page === 'overview'">
          <div class="heading"><div><div class="eyebrow">PERFORMANCE WORKSPACE</div><h1>{{ selected ? selected.name : 'See how your app holds up.' }}</h1><p>{{ selected ? selected.configuration.origin : 'Run controlled scenarios. Watch the traffic. Find the bottlenecks.' }}</p></div><div class="actions"><button v-if="active" class="danger" :disabled="busy || selected?.status === 'stopping'" @click="stop">■ Stop run</button><button class="primary" @click="newTest">＋ New test</button></div></div>
          <div v-if="selected" class="run-strip"><span class="status" :class="selected.status">{{ selected.status }}</span><code>{{ selected.id.slice(0, 12) }}</code><span>{{ selected.engine.toUpperCase() }} engine</span><span>{{ selected.configuration.workload.vus }} configured VUs</span><span v-if="selected.performance_outcome">Thresholds: {{ selected.performance_outcome.replaceAll('_', ' ') }}</span><a v-if="selected.report" :href="`${base}/api/runs/${selected.id}/report?format=html`">Export report ↗</a></div>
          <div class="stats"><article><span>COMPLETED REQUESTS</span><strong>{{ number(completed) }}</strong><small>Actual completed attempts</small></article><article><span>{{ active ? 'CURRENT RPS' : 'COMPLETED RPS' }}</span><strong>{{ number(summary?.completed_rps ?? latest?.completed_rps, 1) }}<em>req/s</em></strong><small>{{ active ? 'Latest interval' : 'Run average' }}</small></article><article><span>P95 LATENCY</span><strong>{{ number(p95, 1) }}<em>ms</em></strong><small>{{ active ? 'Latest interval · approximate' : 'Run distribution · approximate' }}</small></article><article><span>HTTP / TRANSPORT ERRORS</span><strong>{{ number(httpErrors) }}<em>/</em>{{ number(transport) }}</strong><small>HTTP 4xx/5xx / network failures</small></article></div>
          <div class="panel"><Traffic :samples="samples" :active="active" /></div>
          <div class="panel chart-panel"><div class="panel-heading"><span>THROUGHPUT & LATENCY</span><span class="muted">{{ buckets.length ? `${buckets.length} measured intervals` : 'Waiting for measured traffic' }}</span></div><Chart :buckets="buckets" /></div>
          <div class="panel" v-if="selected"><div class="panel-heading"><span>REQUEST SAMPLES <b>{{ samples.length }}</b></span><span class="muted">{{ number(sampleDrops) }} not retained · aggregates include all observations</span></div><div class="table-scroll"><table><thead><tr><th>METHOD / ENDPOINT</th><th>STATUS</th><th>DURATION</th><th>DIAGNOSTICS</th><th></th></tr></thead><tbody><tr v-for="sample in [...samples].reverse().slice(0, 50)" :key="sample.cursor"><td><span class="method">{{ sample.method }}</span><code>{{ sample.endpoint }}</code></td><td><span class="status" :class="{ failed: sample.status_code === null || sample.status_code >= 400 }">{{ sample.status_code ?? 'Transport' }}</span></td><td>{{ number(sample.duration_ms, 1) }} ms</td><td>{{ sample.diagnostics ? 'Correlated' : 'Not sampled' }}</td><td><button class="text-button" @click="inspector = sample">Inspect ↗</button></td></tr><tr v-if="!samples.length"><td colspan="5" class="empty-cell">Request samples appear here when the engine observes traffic.</td></tr></tbody></table></div></div>
          <div class="panel"><div class="panel-heading"><span>RECENT RUNS</span><span class="muted">Persistent run history</span></div><div class="table-scroll"><table><thead><tr><th>SCENARIO</th><th>ENGINE</th><th>STATUS</th><th>STARTED</th><th></th></tr></thead><tbody><tr v-for="run in runs" :key="run.id"><td>{{ run.name }}</td><td><span class="badge">{{ run.engine }}</span></td><td><span class="status" :class="run.status">{{ run.status }}</span></td><td>{{ new Date(run.created_at).toLocaleString() }}</td><td><button class="text-button" @click="select(run)">{{ terminal(run.status) ? 'View report' : 'Monitor' }} ↗</button></td></tr><tr v-if="!runs.length"><td colspan="5" class="empty-cell">Your first measurement starts with a scenario. <button class="text-button" @click="newTest">Create a test →</button></td></tr></tbody></table></div></div>
          <div v-if="selected?.report" class="report-notes"><h2>Measurement notes</h2><p v-for="warning in selected.report.warnings" :key="warning" class="amber">{{ warning }}</p><p v-for="limit in selected.report.limitations" :key="limit">{{ limit }}</p><h2>Threshold results</h2><pre>{{ JSON.stringify(selected.report.thresholds, null, 2) }}</pre></div>
          <footer>SHARED-HOST MEASUREMENTS <span>Use an isolated generator for capacity conclusions.</span></footer>
        </template>

        <template v-else-if="page === 'create'">
          <div class="heading"><div><div class="eyebrow">DEFINE YOUR WORKLOAD</div><h1>Make every request count.</h1><p>Start small. Use an approved target and representative test data.</p></div><button @click="loadJourney">Load login journey example</button></div>
          <div class="panel editor-panel"><div class="panel-heading"><span>SCENARIO CONFIGURATION</span><button class="text-button" @click="toggleAdvanced">{{ advanced ? 'Simple editor' : 'Advanced JSON editor' }}</button></div>
            <div v-if="!advanced" class="form-grid"><label>Scenario name<input v-model="form.name" /></label><label>Target origin<input v-model="form.origin" placeholder="http://127.0.0.1:8000" /></label><label>Engine<select v-model="form.engine"><option v-for="engine in doctor?.engines" :key="engine.name" :value="engine.name" :disabled="!engine.available">{{ engine.name }}{{ !engine.available ? ' · unavailable' : '' }}</option></select></label><label>Workload<select v-model="form.workload.mode"><option v-for="mode in currentModes" :key="mode">{{ mode }}</option></select></label><label>Virtual users<input type="number" v-model.number="form.workload.vus" min="1" /></label><label>Maximum VUs<input type="number" v-model.number="form.workload.max_vus" min="1" /></label><label>Duration<input v-model="form.workload.duration" placeholder="30s" /></label><label v-if="String(form.workload.mode).includes('arrival')">Iterations per second<input type="number" v-model.number="form.workload.rate" min="1" /></label><div class="full hint" v-if="String(form.workload.mode).includes('ramping')">Set stage durations and targets in the advanced JSON editor.</div>
              <div class="full request-step" v-for="(step, i) in form.steps" :key="i"><div class="step-heading">REQUEST {{ i + 1 }}<button v-if="form.steps.length > 1" class="text-button" @click="form.steps.splice(i, 1)">Remove</button></div><div class="step-fields"><label>Method<select v-model="step.method"><option>GET</option><option>POST</option></select></label><label>Path<input v-model="step.path" placeholder="/api/products" /></label></div></div><button class="full text-button" @click="form.steps.push({ name: `step_${form.steps.length + 1}`, method: 'GET', path: '/', expected_status: [200] })">＋ Add request step</button>
              <div class="full hint">Use advanced JSON for extraction, cookies, headers, JSON/form bodies, environment references, think time, stages, and thresholds.</div>
            </div>
            <div v-else class="json-editor"><label for="scenario-json">Versioned scenario JSON</label><textarea id="scenario-json" v-model="editor" spellcheck="false" rows="24"></textarea><p>Credentials use <code v-pre>{{env.STORM_TEST_PASSWORD}}</code>. Variables extracted from earlier responses use <code v-pre>{{csrf}}</code>. Imported scenarios are validated before saving.</p></div>
            <div class="capture-options" v-if="!advanced"><label><input type="checkbox" v-model="form.capture" /> Capture allowlisted body fields (requires configuration)</label><label><input type="checkbox" v-model="form.diagnostics" /> Request sampled Laravel diagnostics (requires signing key)</label></div>
            <div class="editor-actions"><label class="file-button">Import JSON<input type="file" accept="application/json,.json" @change="importFile" /></label><button @click="download('storm-scenario.json', config())">Export JSON</button><button :disabled="busy" @click="save">Save scenario</button><button class="primary" :disabled="busy || !doctor?.supervisor_online" @click="start">{{ busy ? 'Validating…' : 'Start test →' }}</button></div>
          </div>
          <div class="panel" v-if="saved.length"><div class="panel-heading"><span>SAVED SCENARIOS</span></div><div class="saved-list"><button v-for="scenario in saved" :key="scenario.id" @click="loadSaved(scenario.configuration)">{{ scenario.configuration.name }} <span class="muted">{{ scenario.configuration.engine }} ↗</span></button></div></div>
        </template>

        <template v-else-if="page === 'reports'">
          <div class="heading"><div><div class="eyebrow">MEASURE, CHANGE, REPEAT</div><h1>Compare the evidence.</h1><p>Compare observed performance and review workload differences.</p></div></div><div class="panel editor-panel"><div class="form-grid"><label>Before<select v-model="compareLeft"><option value="">Select completed run</option><option v-for="run in runs.filter(r => r.report)" :key="run.id" :value="run.id">{{ run.name }} · {{ run.id.slice(0, 8) }}</option></select></label><label>After<select v-model="compareRight"><option value="">Select completed run</option><option v-for="run in runs.filter(r => r.report)" :key="run.id" :value="run.id">{{ run.name }} · {{ run.id.slice(0, 8) }}</option></select></label></div><div class="editor-actions"><button class="primary" :disabled="!compareLeft || !compareRight || busy" @click="compare">Compare runs →</button><button v-if="comparison" @click="download('storm-comparison.json', comparison)">Export comparison</button></div></div><pre v-if="comparison" class="panel comparison">{{ JSON.stringify(comparison, null, 2) }}</pre>
        </template>
        <template v-else>
          <div class="heading"><div><div class="eyebrow">KNOW YOUR GENERATOR</div><h1>Ready for the next run.</h1><p>Runtime capabilities and supervisor health.</p></div><button @click="action(refresh)">Refresh checks</button></div><div class="panel editor-panel"><div class="health-grid"><article v-for="(value, key) in doctor" :key="key"><template v-if="key !== 'engines'"><span>{{ String(key).replaceAll('_', ' ') }}</span><strong>{{ value }}</strong></template></article></div><div class="engine-card" v-for="engine in doctor?.engines" :key="engine.name"><h2>{{ engine.name.toUpperCase() }} <span class="badge">{{ engine.available ? 'Available' : 'Unavailable' }}</span></h2><p>{{ engine.version ?? engine.reason }}</p><p class="muted">{{ engine.modes.join(' · ') }}</p></div><p class="hint">Targets, limits, retention, capture allowlists, and diagnostic keys are configured in <code>config/storm.php</code>. Secrets are never edited in the dashboard.</p></div>
        </template>
      </div>
    </main>
    <div v-if="inspector" class="modal-backdrop" @click.self="inspector = null" @keydown.esc="inspector = null"><section class="inspector" role="dialog" aria-modal="true" aria-label="Request sample inspector" tabindex="-1"><div class="panel-heading"><span>REQUEST INSPECTOR · SAMPLED</span><button autofocus aria-label="Close inspector" @click="inspector = null">×</button></div><p>Safe metadata from one observed request. Missing fields are not provided by this engine or were not captured.</p><pre>{{ JSON.stringify(inspector, null, 2) }}</pre><button @click="inspector = null">Close inspector</button></section></div>
  </div>
</template>
