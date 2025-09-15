import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "nutrition-yields-cosmetic-regional.trycloudflare.com",
      // or set to `true` to allow all hosts
    ],
    proxy: {
      '/api': 'http://localhost:5000'
    }
  },
});
