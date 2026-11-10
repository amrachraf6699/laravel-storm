<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import type { Sample } from './types';
import { TrafficBuffer } from './traffic';
const props = defineProps<{ samples: Sample[]; active: boolean }>();
const canvas = ref<HTMLCanvasElement>();
const buffer = new TrafficBuffer();
const particles = buffer.particles;
let frame = 0, observer: ResizeObserver | undefined;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
watch(() => props.samples, (samples) => {
  if (!samples.length) buffer.reset();
  buffer.ingest(samples, performance.now(), !reduced.matches && !document.hidden);
  schedule();
}, { deep: false });
watch(() => props.active, schedule);
function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render); }
function render(now: number) {
  frame = 0;
  const el = canvas.value, ctx = el?.getContext('2d');
  if (!el || !ctx) return;
  const width = el.clientWidth, height = el.clientHeight;
  ctx.clearRect(0, 0, width, height);
  const points = [[width * .15, height / 2], [width / 2, height / 2], [width * .85, height / 2]];
  ctx.strokeStyle = '#2a3b44'; ctx.lineWidth = 1; ctx.setLineDash([4, 6]);
  for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(...points[i] as [number, number]); ctx.lineTo(...points[i + 1] as [number, number]); ctx.stroke(); }
  ctx.setLineDash([]);
  for (let i = 0; i < 3; i++) {
    const [x, y] = points[i]; ctx.fillStyle = '#14231f'; ctx.strokeStyle = '#416a5c';
    ctx.beginPath(); ctx.arc(x, y, i === 1 ? 31 : 23, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#b6d6cc'; ctx.textAlign = 'center'; ctx.font = '12px system-ui'; ctx.fillText(['VUs', 'ϟ', 'HTTP'][i], x, y + 4);
    ctx.fillStyle = '#8c9ba7'; ctx.fillText(['Engine', 'Laravel target', 'Responses'][i], x, y + 60);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i], t = (now - p.time) / p.duration;
    if (t >= 1 || document.hidden || reduced.matches) { particles.splice(i, 1); continue; }
    ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(width * (.15 + .7 * t), height / 2 + Math.sin(t * Math.PI * 2) * 18, 3, 0, Math.PI * 2); ctx.fill();
  }
  if (!reduced.matches && !document.hidden && (props.active || particles.length)) schedule();
}
function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; buffer.reset(); } else schedule(); }
onMounted(() => {
  observer = new ResizeObserver(() => { if (!canvas.value) return; const el = canvas.value, ratio = window.devicePixelRatio || 1; el.width = el.clientWidth * ratio; el.height = el.clientHeight * ratio; el.getContext('2d')?.scale(ratio, ratio); schedule(); });
  if (canvas.value) observer.observe(canvas.value);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', schedule);
  schedule();
});
onUnmounted(() => { cancelAnimationFrame(frame); observer?.disconnect(); document.removeEventListener('visibilitychange', visibility); reduced.removeEventListener('change', schedule); buffer.reset(); });
</script>
<template><div class="traffic"><div class="panel-heading"><span>TRAFFIC FLOW</span><span class="badge">Observed samples · capped at 120 particles</span></div><canvas ref="canvas" role="img" aria-label="Sampled requests moving from the load engine through Laravel to HTTP responses"></canvas><div class="traffic-legend"><span>● Success</span><span class="amber">● Slow</span><span class="red">● HTTP error</span><span class="purple">● Transport failure</span><span v-if="reduced.matches">Reduced motion enabled</span></div></div></template>
