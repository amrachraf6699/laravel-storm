import http from 'node:http';
import { randomBytes } from 'node:crypto';
let counts = {}, tokens = new Map();
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://fixture');
  if (url.pathname === '/stats') { res.setHeader('Content-Type', 'application/json'); return res.end(JSON.stringify(counts)); }
  if (url.pathname === '/reset') { counts = {}; tokens = new Map(); return res.end('ok'); }
  counts[url.pathname] = (counts[url.pathname] || 0) + 1;
  const body = await new Promise(resolve => { let body = ''; req.on('data', chunk => body += chunk); req.on('end', () => resolve(body)); });
  res.setHeader('Content-Type', 'application/json');
  if (url.pathname === '/fast') return res.end(JSON.stringify({ name: 'Fixture', public: true }));
  if (url.pathname === '/fail') { res.statusCode = 500; return res.end('{"error":"fixture"}'); }
  if (url.pathname === '/slow') return setTimeout(() => res.end('{"ok":true}'), Number(url.searchParams.get('ms') || 80));
  if (url.pathname === '/timeout') return setTimeout(() => res.end('{"ok":true}'), 1000);
  if (url.pathname === '/large') return res.end(JSON.stringify({ name: 'x'.repeat(2 * 1024 * 1024) }));
  if (url.pathname === '/redirect') { res.statusCode = 302; res.setHeader('Location', 'http://169.254.169.254/latest'); return res.end(); }
  if (url.pathname === '/login' && req.method === 'GET') {
    const sid = randomBytes(12).toString('hex'), csrf = randomBytes(12).toString('hex'); tokens.set(sid, csrf);
    res.setHeader('Content-Type', 'text/html'); res.setHeader('Set-Cookie', `sid=${sid}; Path=/; HttpOnly`);
    return res.end(`<input type="hidden" name="_token" value="${csrf}">`);
  }
  if (url.pathname === '/login' && req.method === 'POST') {
    const sid = /sid=([a-z0-9]+)/.exec(req.headers.cookie || '')?.[1], form = new URLSearchParams(body);
    if (!sid || tokens.get(sid) !== form.get('_token') || form.get('password') !== 'super-secret-fixture-password') { res.statusCode = 403; return res.end('{"error":"isolation failure"}'); }
    res.setHeader('Set-Cookie', `authenticated=${sid}; Path=/; HttpOnly`); return res.end('{"name":"signed in"}');
  }
  if (url.pathname === '/orders') {
    if (!/authenticated=/.test(req.headers.cookie || '')) { res.statusCode = 401; return res.end('{}'); }
    res.statusCode = 201; return res.end('{"id":123,"name":"Order","password":"never capture this"}');
  }
  res.statusCode = 404; res.end('{}');
});
server.listen(0, '127.0.0.1', () => process.stdout.write(JSON.stringify({ port: server.address().port }) + '\n'));
