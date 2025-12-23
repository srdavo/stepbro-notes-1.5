const { defineConfig } = require('vite');
const path = require('path');

module.exports = defineConfig({
    root: './', // This tells vite where the index.html is located
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@core': path.resolve(__dirname, './src/core'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@features': path.resolve(__dirname, './src/features'),
            '@styles': path.resolve(__dirname, './src/styles'),
        }
    },
    build: { 
        outDir: 'public', // Vite will output all the build in the /public folder
        emptyOutDir: true, // Before building it will delete previous files
    },
    server: {
        port: 5173,
        proxy: {
            '/api': { // Vite will intercept calls to /api and redirect them to the Express server
                target: 'http://localhost:3000',
                changeOrigin: true, // This is some cors thing
            }
        }
    }
});