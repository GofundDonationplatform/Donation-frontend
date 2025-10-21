import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("src");

function walk(dir, callback) {
  fs.readdirSync(dir).forEach((file) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (/\.(jsx|js)$/.test(filepath)) {
      callback(filepath);
    }
  });
}

walk(SRC_DIR, (file) => {
  let content = fs.readFileSync(file, "utf-8");

  // Replace <img ...> with <ImageWithFallback ...>
  content = content.replace(
    /<img([^>]*?)src=["']([^"']*?)(charity[0-9]+)\.(jpg|png)["']([^>]*)>/g,
    `<ImageWithFallback src={images.$3} $1 $5 />`
  );

  // Inject imports if not present
  if (!content.includes("ImageWithFallback")) {
    content =
      `import ImageWithFallback from "@/components/ImageWithFallback";\n` +
      `import { images } from "@/assets/images";\n` +
      content;
  }

  fs.writeFileSync(file, content, "utf-8");
  console.log(`✔ Fixed ${file}`);
});

console.log("✨ All images updated!");
