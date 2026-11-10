import { defineConfig } from '@playwright/test';
import { randomBytes } from 'node:crypto';
import { mkdirSync } from 'node:fs';

process.env.APP_KEY ??= 'base64:' + randomBytes(32).toString('base64');
process.env.APP_ENV = 'local';
for (const path of ['workbench/storage/framework/sessions', 'workbench/storage/framework/views', 'workbench/storage/framework/cache/data', 'workbench/storage/logs', 'workbench/bootstrap/cache']) mkdirSync(path, { recursive: true });
export default defineConfig({
  testDir: './tests/Browser', timeout: 60000, workers: 1,
  use: { baseURL: 'http://127.0.0.1:8000', browserName: 'chromium', channel: process.env.STORM_BROWSER_CHANNEL || undefined, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  webServer: { command: 'php -S 127.0.0.1:8000 -t workbench/public workbench/server.php', url: 'http://127.0.0.1:8000/storm/login', timeout: 30000, reuseExistingServer: false },
});
