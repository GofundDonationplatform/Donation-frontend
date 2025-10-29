import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      // ✅ ensure _redirects gets copied to dist/
      name: "copy-redirects",
      closeBundle() {
        try {
          copyFileSync("public/_redirects", "dist/_redirects");
          console.log("✅ Copied _redirects to dist/");
        } catch (err) {
          console.error("⚠️ Failed to copy _redirects:", err);
        }
      },
    },
  ],
  css: {
    transformer: "postcss", // ✅ keep Tailwind setup
  },
  server: {
    host: true, // ✅ allow network access in Termux
  },
});
