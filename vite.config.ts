import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production'), __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: false, __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false },
  build: {
    outDir: 'dist', emptyOutDir: true, lib: { entry: 'resources/js/main.ts', formats: ['es'], fileName: () => 'storm.js', cssFileName: 'storm' },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
