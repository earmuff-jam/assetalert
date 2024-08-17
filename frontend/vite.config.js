import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
  server: {
    watch: {
     usePolling: true,
    },
    host: true,
  }});
