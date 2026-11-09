import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build` → normal production build in dist/.
// SINGLE=1 npm run build → everything inlined into one HTML file (used for quick previews).
export default defineConfig({
  base: './',
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
});
