import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Safe, minimal config for Android/Termux (no LightningCSS)
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: "postcss", // Force Tailwind to use PostCSS
  },
  server: {
    host: true,
  },
});
