import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    server: {
        port: 3000, // Default port
        strictPort: true, // Throws an error if port is in use
        hmr: true,
    },
    build: {
        outDir: 'dist',
    },
    logLevel: 'info', // Show only errors (set to 'info' or 'debug' for more details)
    clearScreen: false,
    resolve: {
        alias: {
            // Define an alias for your project root
            '@': path.resolve(__dirname, './src'),
        },
    },
    // Support for JSX 
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment',
        jsxInject: `
      import State, { h, Fragment, navigate, routes, updateDOM, validate, resetValidation } from '@/pragmatic.js';
      import jssLite from '@/utils/jss-lite.js';
      let data = State.getData();
    `
    }
});