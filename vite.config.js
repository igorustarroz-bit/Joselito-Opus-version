import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// base './' para que el build funcione en GitHub Pages y abriendo dist/ en local
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), svgr({ svgrOptions: { icon: true, replaceAttrValues: { '#000': 'currentColor', '#000000': 'currentColor' } } })],
  resolve: { alias: { '@': '/src' } },
});
