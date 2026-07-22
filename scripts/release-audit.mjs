import { existsSync } from "node:fs";

const requiredFiles = [
  ".github/workflows/ci.yml",
  "supabase/migrations/002_full_architecture.sql",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/manifest.ts",
  "playwright.config.ts",
  "lighthouserc.json"
];

const missing=requiredFiles.filter(file=>!existsSync(file));
if(missing.length){
  console.error("Missing release files:",missing.join(", "));
  process.exit(1);
}
console.log("Release file audit passed.");
