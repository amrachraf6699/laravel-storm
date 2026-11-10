import type { Sample } from './types';

export type Particle = { time: number; duration: number; color: string };
export class TrafficBuffer {
  readonly particles: Particle[] = [];
  private cursor = 0;
  constructor(readonly limit = 120) {}
  ingest(samples: Sample[], now: number, animate: boolean): void {
    for (const sample of samples) {
      if (sample.cursor <= this.cursor) continue;
      this.cursor = sample.cursor;
      if (animate && this.particles.length < this.limit) this.particles.push({ time: now, duration: 1500, color: sample.status_code === null ? '#b899ef' : sample.status_code >= 400 ? '#f87e87' : sample.duration_ms > 500 ? '#efbd6b' : '#6de6c6' });
    }
  }
  prune(now: number): void {
    for (let i = this.particles.length - 1; i >= 0; i--) if (now - this.particles[i].time >= this.particles[i].duration) this.particles.splice(i, 1);
  }
  reset(): void { this.particles.splice(0); this.cursor = 0; }
}
