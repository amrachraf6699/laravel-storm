import { describe, expect, it } from 'vitest';
import { TrafficBuffer } from './traffic';
import type { Sample } from './types';

describe('measured traffic rendering budget', () => {
  const events = (count: number): Sample[] => Array.from({ length: count }, (_, i) => ({ cursor: i + 1, method: 'GET', endpoint: '/fixture', status_code: 200, duration_ms: 10 }));
  it('bounds animation under a flood and does not replay discarded or duplicate events', () => {
    const buffer = new TrafficBuffer();
    const observed = events(10000);
    buffer.ingest(observed, 0, true);
    expect(buffer.particles).toHaveLength(120);
    buffer.prune(1600);
    buffer.ingest(observed, 1700, true);
    expect(buffer.particles).toHaveLength(0);
  });
  it('consumes events without animation for reduced motion and background tabs', () => {
    const buffer = new TrafficBuffer();
    buffer.ingest(events(500), 0, false);
    expect(buffer.particles).toHaveLength(0);
    buffer.ingest(events(500), 100, true);
    expect(buffer.particles).toHaveLength(0);
  });
});
