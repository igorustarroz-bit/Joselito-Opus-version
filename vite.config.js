import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// SVGR: importa SVGs como componentes React (color por currentColor / token).
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
});
