import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    {
      name: "safe-copy-netlify-redirects",
      closeBundle() {
        const src = path.resolve("public/_redirects");
        const dest = path.resolve("dist/_redirects");
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log("✅ Copied _redirects to dist/");
        } else {
          console.log("ℹ️ No _redirects file found, skipping copy");
        }
      },
    },
  ],
});
