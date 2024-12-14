import { defineConfig } from "vite";
import fs from 'fs';
import path from 'path';

export default defineConfig({
  base: '',
  build: {
    minify: false,
    rollupOptions: {
      input: {
        plugin: "src/plugin.ts",
        index: "./index.html",
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return '[name].css'; // Remove the hash
          }
          return '[name]-[hash].[ext]'; // Default behavior for other assets
        },
      },
    },
  },
  plugins: [
    {
      name: 'inline-script',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist');
        const mainFile = path.resolve(distDir, 'index.js');
        const htmlFile = path.resolve(distDir, 'index.html');
        const cssFile = path.resolve(distDir, 'index.css');

        // Read the generated JavaScript and HTML files
        const jsCode = fs.readFileSync(mainFile, 'utf-8');
        const cssCode = fs.readFileSync(cssFile, 'utf-8');
        let html = fs.readFileSync(htmlFile, 'utf-8');

        // Inject the JavaScript code as an inline script
        html = html.replace(
          /<script type="module" crossorigin src=".\/index.js"><\/script>/,
          ``
        );

        html = html.replace(
          /<script name="inline"><\/script>/,
          `<script>${jsCode}</script>`
        );

        html = html.replace(
          /<link rel="stylesheet" crossorigin href=".*?">/,
          `<style>${cssCode}</style>`
        );

        
        // Write the updated HTML back to the dist directory
        fs.writeFileSync(htmlFile, html, 'utf-8');

        // Optionally, remove the original main.js file
        // fs.unlinkSync(mainFile);
      },
    },
  ],
  preview: {
    port: 4500,
  },
});
