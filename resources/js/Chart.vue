<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { init, use, type ECharts } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { Bucket } from './types';
use([LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);
const props = defineProps<{ buckets: Bucket[] }>();
const element = ref<HTMLElement>();
let chart: ECharts | undefined, observer: ResizeObserver | undefined;
function update() {
  chart?.setOption({ backgroundColor: 'transparent', animation: false, textStyle: { color: '#8c9ba7', fontFamily: 'system-ui' }, tooltip: { trigger: 'axis' }, legend: { data: ['Completed RPS', 'P95 ms'], textStyle: { color: '#a6b4c4' }, right: 10 }, grid: { left: 48, right: 48, bottom: 30, top: 40 }, xAxis: { type: 'category', data: props.buckets.map(b => b.elapsed_second + 's'), axisLine: { lineStyle: { color: '#27333d' } } }, yAxis: [{ type: 'value', splitLine: { lineStyle: { color: '#1d2933' } } }, { type: 'value', splitLine: { show: false } }], series: [{ name: 'Completed RPS', type: 'line', showSymbol: false, data: props.buckets.map(b => b.completed_rps), lineStyle: { color: '#6de6c6', width: 2 }, itemStyle: { color: '#6de6c6' }, areaStyle: { color: '#6de6c6', opacity: .05 } }, { name: 'P95 ms', yAxisIndex: 1, type: 'line', showSymbol: false, data: props.buckets.map(b => b.latency.p95_ms), lineStyle: { color: '#b899ef', width: 2 }, itemStyle: { color: '#b899ef' } }] });
}
watch(() => props.buckets, update);
onMounted(() => { if (!element.value) return; chart = init(element.value); observer = new ResizeObserver(() => chart?.resize()); observer.observe(element.value); update(); });
onUnmounted(() => { observer?.disconnect(); chart?.dispose(); });
</script>
<template><div ref="element" class="chart" role="img" aria-label="Completed requests per second and P95 latency over time"></div></template>
