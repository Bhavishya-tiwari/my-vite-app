import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/my-vite-app/', // This is for setting the base path when deploying to a subdirectory.
});
