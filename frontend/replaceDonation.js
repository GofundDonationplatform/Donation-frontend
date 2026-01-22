// replaceDigital Impact Support.js
import fs from "fs";
import path from "path";

// Folder to scan (frontend root)
const rootDir = "./";

const supportWords = [
  { search: /Support/g, replace: "Support" },
  { search: /Digital Impact Support/g, replace: "Digital Impact Support" },
  { search: /support/g, replace: "support" },
  { search: /Support/g, replace: "Support" },
  { search: /supporter/g, replace: "supporter" },
  { search: /Supporter/g, replace: "Supporter" },
];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(js|jsx)$/.test(file)) {
      let content = fs.readFileSync(fullPath, "utf8");
      let updated = content;

      supportWords.forEach(({ search, replace }) => {
        updated = updated.replace(search, replace);
      });

      if (updated !== content) {
        fs.writeFileSync(fullPath, updated, "utf8");
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

walkDir(rootDir);
console.log("✅ Finished replacing support wording with Digital Impact Support!");
