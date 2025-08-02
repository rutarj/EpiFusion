import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request that starts with /api will be forwarded to the backend
      '/api': 'http://localhost:5050',
    },
  },
});
