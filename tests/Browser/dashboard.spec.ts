import { test, expect } from '@playwright/test';
import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

for (const path of ['workbench/storage/framework/sessions', 'workbench/storage/framework/views', 'workbench/storage/framework/cache/data', 'workbench/storage/logs', 'workbench/bootstrap/cache']) mkdirSync(path, { recursive: true });

test('local authentication, real run, inspector, exports and comparison', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => { errors.push(error.message); console.error('Browser error:', error.message); });
  page.on('console', message => { if (message.type() === 'error') console.error('Browser console:', message.text()); });
  const token = execFileSync('php', ['workbench/artisan', 'storm:login'], { encoding: 'utf8', env: process.env }).split(/\r?\n/).find(line => /^[a-f0-9]{64}$/.test(line))!;
  const supervisor = spawn('php', ['workbench/artisan', 'storm:serve'], { env: process.env, windowsHide: true, stdio: 'ignore' });
  try {
    await page.goto('/storm/login');
    await page.getByLabel('Local access token').fill(token);
    await page.getByRole('button', { name: 'Open Storm' }).click();
    await expect(page.getByRole('heading', { name: 'See how your app holds up.' })).toBeVisible();
    await page.screenshot({ path: '.cache/dashboard-overview.png', fullPage: true });
    await page.getByRole('button', { name: 'New test', exact: false }).click();
    await expect(page.getByRole('heading', { name: 'Make every request count.' })).toBeVisible();
    await page.getByRole('button', { name: 'Advanced JSON editor' }).click();
    const scenario = { schema_version: 1, name: 'Browser verification', origin: 'http://127.0.0.1:8000', engine: 'php', steps: [{ name: 'products', method: 'GET', path: '/api/products', expected_status: [200] }], workload: { mode: 'fixed-vus', vus: 2, duration: 2, rps_limit: 10 }, thresholds: [{ metric: 'p95_ms', value: 1000 }] };
    await page.getByLabel('Versioned scenario JSON').fill(JSON.stringify(scenario, null, 2));
    await expect(page.getByRole('button', { name: 'Start test' })).toBeEnabled({ timeout: 15000 });
    await page.getByRole('button', { name: 'Save scenario' }).click();
    await expect(page.getByRole('status')).toContainText('Scenario saved');
    await page.getByRole('button', { name: 'Start test' }).click();
    await expect(page.locator('.run-strip .status')).toHaveText('completed', { timeout: 30000 });
    await expect(page.locator('.stats article strong').first()).not.toHaveText('0');
    await page.getByRole('button', { name: 'Inspect', exact: false }).first().click();
    await expect(page.getByRole('dialog')).toContainText('products');
    await page.getByRole('button', { name: 'Close inspector', exact: true }).last().click();
    await page.screenshot({ path: '.cache/dashboard-run.png', fullPage: true });
    const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('link', { name: 'Export report' }).click()]);
    expect(download.suggestedFilename()).toMatch(/storm-.*\.html/);
    await page.getByRole('button', { name: 'Reports & compare' }).click();
    await page.getByLabel('Before').selectOption({ index: 1 });
    await page.getByLabel('After').selectOption({ index: 1 });
    await page.getByRole('button', { name: 'Compare runs' }).click();
    await expect(page.locator('.comparison')).toContainText('not a statistical significance test');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Overview', exact: false }).click();
    await page.screenshot({ path: '.cache/dashboard-mobile.png', fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  } finally { supervisor.kill(); }
});
