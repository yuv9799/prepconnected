import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
const apiTarget = process.env.VITE_API_PROXY_TARGET ?? 'http://localhost:8080';
const base = process.env.GITHUB_PAGES === 'true' ? '/prep-frontend/' : '/';
// Keep this JS config aligned with vite.config.ts; Vite may prefer the JS file.
export default defineConfig({
    base,
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: apiTarget,
                changeOrigin: true,
            },
        },
    },
});
