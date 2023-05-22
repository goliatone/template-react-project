/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import VitePluginBrowserSync from 'vite-plugin-browser-sync';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePluginBrowserSync({
            bs: {
                ui: {
                    port: 3000,
                },
                notify: true,
                plugins: ['bs-console-qrcode'],
            },
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    // optimizeDeps: {},
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
    },
    define: {
        // Some libraries use the global object, even though it doesn't exist in the browser.
        // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
        // https://github.com/vitejs/vite/discussions/5912
        global: {},
    },
});
