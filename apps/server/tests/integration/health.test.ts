import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import type { Express } from 'express';
import { createApp } from '../../src/app.js';

describe('Health Check Endpoint', () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  it('should return 200 and health status at /api/v1/health', async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      success: true,
      data: {
        status: 'healthy',
        environment: expect.any(String),
        timestamp: expect.any(String),
      },
    });
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app)
      .get('/unknown-route')
      .expect(404)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Resource not found',
      },
    });
  });

  it('should return API info at /api/v1', async () => {
    const response = await request(app)
      .get('/api/v1')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toMatchObject({
      success: true,
      data: {
        message: 'StokFlow API v1',
        version: '1.0.0',
      },
    });
  });
});
