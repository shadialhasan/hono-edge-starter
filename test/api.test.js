/**
 * Automated Route Tests for Hono Edge Starter
 * Author: Eng. MHD. Shadi AL-Hasan <mhd.shadi.alhasan@gmail.com>
 */

const test = require('node:test');
const assert = require('node:assert');
const { Hono } = require('hono');

// Replicate core routes logic for edge testing
function createTestApp() {
  const app = new Hono();

  app.get('/health', (c) => {
    return c.json({
      status: 'HEALTHY',
      region: 'LOCAL_EDGE',
      timestamp: new Date().toISOString(),
      maintainer: 'Eng. MHD. Shadi AL-Hasan'
    });
  });

  app.get('/api/v1/users', (c) => {
    return c.json({
      success: true,
      data: [
        { id: 1, name: 'Enterprise Admin', role: 'CTO' },
        { id: 2, name: 'Lead Architect', role: 'DevOps' }
      ]
    });
  });

  return app;
}

test('GET /health returns 200 and healthy status', async () => {
  const app = createTestApp();
  const res = await app.request('/health');
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.status, 'HEALTHY');
  assert.strictEqual(data.maintainer, 'Eng. MHD. Shadi AL-Hasan');
});

test('GET /api/v1/users returns user list payload', async () => {
  const app = createTestApp();
  const res = await app.request('/api/v1/users');
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.length, 2);
  assert.strictEqual(data.data[0].role, 'CTO');
});

test('GET /unknown-route returns 404', async () => {
  const app = createTestApp();
  const res = await app.request('/not-found');
  assert.strictEqual(res.status, 404);
});
