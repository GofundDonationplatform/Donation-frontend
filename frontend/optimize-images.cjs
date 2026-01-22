// optimize-images.cjs
const fs = require("fs");
const path = require("path");
const imageCompression = require("browser-image-compression");

(async () => {
  const inputDir = path.join(__dirname, "src/assets");
  const outputDir = path.join(__dirname, "src/assets/optimized");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));

  for (const file of files) {
    try {
      const filePath = path.join(inputDir, file);
      const buffer = fs.readFileSync(filePath);

      const compressed = await imageCompression(new Blob([buffer]), {
        maxSizeMB: 1,               // target max size per image
        maxWidthOrHeight: 1280,     // resize if too large
        useWebWorker: false         // disable web worker for Node
      });

      const outPath = path.join(outputDir, file);
      const arrayBuffer = await compressed.arrayBuffer();
      fs.writeFileSync(outPath, Buffer.from(arrayBuffer));

      console.log(`✅ Optimized: ${file} → ${outPath}`);
    } catch (err) {
      console.error(`❌ Failed to optimize ${file}:`, err.message);
    }
  }
})();
