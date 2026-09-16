/**
 * vite.config.js
 * ---------------------------------------------------------------
 * Configuración de Vite para el build de producción.
 *
 * Optimizaciones aplicadas:
 *  - target es2019: transpila a JS moderno pero compatible,
 *    generando bundles más pequeños que el default de Vite 4.
 *  - chunkSizeWarningLimit: umbral de aviso por chunk.
 *  - assetsInlineLimit: los assets pequeños (<8kB) se embeben como
 *    data-URI, reduciendo peticiones HTTP.
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    target: "es2019",
    chunkSizeWarningLimit: 300,
    assetsInlineLimit: 8192,
    rollupOptions: {
      output: {
        // Split de vendor: las librerías casi nunca cambian entre
        // deploys, así que el navegador las cachea por separado y
        // cada nueva versión solo invalida el chunk de la app.
        manualChunks: {
          vendor: ["vue", "vue-router"],
          http: ["axios"],
        },
      },
    },
  },
});

