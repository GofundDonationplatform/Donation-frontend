// replaceDonation.js
import fs from "fs";
import path from "path";

const FRONTEND_DIR = "./src"; // adjust if your components/pages are elsewhere

// Words to replace: key is old, value is new
const replacements = {
  "Donate": "Support",
  "Donation": "Digital Impact Support",
  "donation": "digital impact support",
  "DONATE": "SUPPORT",
  "DONATION": "DIGITAL IMPACT SUPPORT",
};

// Recursively process directories
function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      processDir(fullPath);
    } else if (stats.isFile() && (file.endsWith(".jsx") || file.endsWith(".js"))) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let newContent = content;

      Object.keys(replacements).forEach((oldWord) => {
        const newWord = replacements[oldWord];
        const regex = new RegExp(oldWord, "g");
        newContent = newContent.replace(regex, newWord);
      });

      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, "utf-8");
        console.log(`Updated: ${fullPath}`);
      }
    }
  });
}

processDir(FRONTEND_DIR);
console.log("✅ Finished replacing donation wording with Digital Impact Support!");
