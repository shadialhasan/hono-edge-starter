/**
 * Hono Edge Starter - High Performance Edge Microservice
 * Author: Eng. MHD. Shadi AL-Hasan <mhd.shadi.alhasan@gmail.com>
 * Phone: +963934005922
 * Copyright (c) 2026 MHD. Shadi AL-Hasan
 */

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';

const app = new Hono();

app.use('*', logger());
app.use('*', prettyJSON());

// Health & System Info
app.get('/health', (c) => {
  return c.json({
    status: 'HEALTHY',
    region: c.req.raw.cf?.colo || 'LOCAL_EDGE',
    timestamp: new Date().toISOString(),
    maintainer: 'Eng. MHD. Shadi AL-Hasan'
  });
});

// Sample Resource API
app.get('/api/v1/users', (c) => {
  return c.json({
    success: true,
    data: [
      { id: 1, name: 'Enterprise Admin', role: 'CTO' },
      { id: 2, name: 'Lead Architect', role: 'DevOps' }
    ]
  });
});

export default app;
