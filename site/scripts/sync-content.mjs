import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..");
const VAULT_ROOT = path.resolve(SITE_ROOT, "..");
const CONTENT_DIR = path.join(SITE_ROOT, "content");

const EXCLUDED_DIRS = new Set(["site", "node_modules", ".git", ".next"]);

function copyMarkdown(dir, relDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (EXCLUDED_DIRS.has(entry.name)) continue;

    const srcPath = path.join(dir, entry.name);
    const relPath = path.join(relDir, entry.name);

    if (entry.isDirectory()) {
      copyMarkdown(srcPath, relPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
      const destPath = path.join(CONTENT_DIR, relPath);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

fs.rmSync(CONTENT_DIR, { recursive: true, force: true });
fs.mkdirSync(CONTENT_DIR, { recursive: true });
copyMarkdown(VAULT_ROOT, "");

console.log(`Synced markdown content from vault into ${path.relative(SITE_ROOT, CONTENT_DIR)}/`);
