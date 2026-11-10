// Storm controls this script; user scenarios are data, never executable code.
const outcomes = new Counter('storm_outcomes');
const checks = new Counter('storm_check_failures');
const started = new Counter('storm_started');
const secrets = JSON.parse(__ENV.STORM_SECRETS || '{}');
const knownSecrets = Object.values(secrets.environment || {}).map(String);
let sampleSecond = -1;
let sampleCount = 0;

function sensitive(key) { return /password|passwd|secret|token|authorization|cookie|api[-_]?key|csrf|credential/i.test(key); }
function clean(value) {
  if (typeof value === 'string') {
    for (const secret of knownSecrets) if (secret) value = value.split(secret).join('[REDACTED]').split(encodeURIComponent(secret)).join('[REDACTED]');
    return value;
  }
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) result[key] = sensitive(key) ? '[REDACTED]' : clean(value[key]);
    return result;
  }
  return value;
}
function interpolate(value, variables, encode = false) {
  if (Array.isArray(value)) return value.map(item => interpolate(item, variables, encode));
  if (value && typeof value === 'object') {
    const result = {};
    for (const key of Object.keys(value)) result[key] = interpolate(value[key], variables, encode);
    return result;
  }
  if (typeof value !== 'string') return value;
  return value.replace(/\{\{(env\.[A-Z_][A-Z0-9_]*|[A-Za-z][A-Za-z0-9_]*)\}\}/g, (_, key) => {
    const source = key.startsWith('env.') ? secrets.environment : variables;
    const name = key.startsWith('env.') ? key.slice(4) : key;
    if (!source || source[name] === undefined) throw new Error('Missing journey variable');
    const result = String(source[name]);
    if (!knownSecrets.includes(result)) knownSecrets.push(result);
    return encode ? encodeURIComponent(result) : result;
  });
}
function capture(body, contentType) {
  if (!config.capture || !settings.capture.enabled || typeof body !== 'string') return null;
  if (body.length > Math.min(settings.capture.max_bytes, 16384)) return { omitted: 'body exceeds capture limit' };
  let data;
  try {
    if (contentType.toLowerCase().includes('application/json')) data = JSON.parse(body);
    else if (contentType.toLowerCase().includes('application/x-www-form-urlencoded')) {
      data = {};
      for (const pair of body.split('&')) { const [key, value = ''] = pair.split('='); data[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' ')); }
    } else return null;
  } catch (_) { return null; }
  const result = {};
  for (const field of settings.capture.fields) if (!sensitive(field) && Object.prototype.hasOwnProperty.call(data, field)) result[field] = clean(data[field]);
  return result;
}
function diagnosticHeader(trace) {
  const payload = JSON.stringify({ run_id: __ENV.STORM_RUN_ID, trace_id: trace, expires: Math.floor(Date.now() / 1000) + 120 });
  const encoded = encoding.b64encode(payload, 'rawurl');
  return encoded + '.' + crypto.hmac('sha256', secrets.diagnostic_key, encoded, 'hex');
}
export function setup() { console.log(JSON.stringify({ storm_ready: Date.now() })); }
export default function () {
  knownSecrets.length = 0;
  knownSecrets.push(...Object.values(secrets.environment || {}).map(String));
  const variables = {};
  const jar = http.cookieJar();
  jar.clear(config.origin);
  for (const step of config.steps) {
    const second = Math.floor(exec.instance.currentTestRunDuration / 1000);
    if (second !== sampleSecond) { sampleSecond = second; sampleCount = 0; }
    const maxVus = config.workload.max_vus;
    const limit = settings.sample_limit;
    const permitted = ((exec.vu.idInTest - 1 + second * limit) % maxVus) < Math.min(limit, maxVus);
    const sample = permitted && sampleCount < Math.max(1, Math.floor(limit / maxVus));
    if (sample) sampleCount++;
    const headers = interpolate(step.headers || {}, variables);
    const path = interpolate(step.path, variables, true);
    const trace = crypto.randomBytes(8);
    const traceId = encoding.b64encode(trace, 'rawurl');
    if (config.diagnostics && secrets.diagnostic_key && Math.random() < settings.diagnostic_rate) headers['X-Storm-Context'] = diagnosticHeader(traceId);
    let body = null;
    if (step.json) { body = JSON.stringify(interpolate(step.json, variables)); headers['Content-Type'] = 'application/json'; }
    if (step.form) { body = Object.entries(interpolate(step.form, variables)).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&'); headers['Content-Type'] = 'application/x-www-form-urlencoded'; }
    const needsBody = Object.keys(step.extract || {}).some(key => step.extract[key].source !== 'header') || (sample && config.capture);
    started.add(1);
    const response = http.request(step.method, config.origin + path, body, { headers, timeout: step.timeout + 's', redirects: 0, responseType: needsBody ? 'text' : 'none', tags: { name: step.name } });
    const status = response.status || null;
    const expected = status !== null && step.expected_status.includes(status);
    const tags = { step: step.name, status_code: String(status || 0), error_type: response.error_code === 1050 ? 'timeout' : (status ? '' : 'transport'), expected: String(expected) };
    outcomes.add(1, tags);
    let extractionFailed = false;
    try {
      if (response.body && response.body.length > settings.max_response_bytes) throw new Error('Response exceeds limit');
      for (const [name, rule] of Object.entries(step.extract || {})) {
        let value;
        if (rule.source === 'header') value = Object.entries(response.headers).find(([key]) => key.toLowerCase() === rule.path.toLowerCase())?.[1];
        if (rule.source === 'json') value = rule.path.split('.').reduce((current, key) => current?.[key], response.json());
        if (rule.source === 'css') { const selection = response.html().find(rule.path).first(); value = rule.attribute ? selection.attr(rule.attribute) : selection.text(); }
        if (value === undefined || value === null || String(value) === '' || String(value).length > 16384) throw new Error('Extraction failed');
        variables[name] = String(value);
        if (!knownSecrets.includes(String(value))) knownSecrets.push(String(value));
      }
    } catch (_) { extractionFailed = true; }
    if (expected && extractionFailed) checks.add(1);
    if (sample) {
      const safeHeaders = {};
      for (const [key, value] of Object.entries(response.headers)) if (settings.capture.headers.includes(key.toLowerCase()) && !sensitive(key)) safeHeaders[key.toLowerCase()] = clean(value);
      const event = { method: step.method, endpoint: step.path.split('?')[0], step: step.name, virtual_user: exec.vu.idInTest, trace_id: traceId, elapsed_ms: exec.instance.currentTestRunDuration, status_code: status, expected: expected && !extractionFailed, duration_ms: response.timings.duration, error_type: tags.error_type || null, extraction_failed: extractionFailed, headers: safeHeaders, request_body: capture(body, headers['Content-Type'] || ''), response_body: capture(response.body, response.headers['Content-Type'] || ''), timings: { waiting_ms: response.timings.waiting, receiving_ms: response.timings.receiving } };
      const sanitized = clean(event);
      sanitized.trace_id = traceId;
      console.log(JSON.stringify({ storm_sample: sanitized }));
    }
    if (!status || extractionFailed) break;
    if (step.think_time) sleep(step.think_time);
  }
}
