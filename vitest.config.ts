import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    mockReset: true,
    clearMocks: true,
    restoreMocks: true,
    include: ['src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist'],
    reporters: ['verbose'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      exclude: ['src/main.tsx', 'src/setupTests.ts', '**/*.d.ts'],
    },
  },
});