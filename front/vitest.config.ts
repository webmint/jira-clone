import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
      typecheck: {
          tsconfig: './tsconfig.vitest.json',
      },

  },
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
    // alias: {
    //   '@/': new URL('./src/', import.meta.url).pathname,
    //   '~@/': new URL('./src/', import.meta.url).pathname,
    // },
  },
});
