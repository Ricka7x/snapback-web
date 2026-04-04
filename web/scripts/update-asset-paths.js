#!/usr/bin/env node
/**
 * Asset Path Replacer
 * Scans source files and updates image/video paths based on asset manifest
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ROOT_DIR = path.join(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT_DIR, 'public', 'assets', 'manifest.json');
const CONFIG_PATH = path.join(ROOT_DIR, 'build-assets.config.json');
const SRC_DIR = path.join(ROOT_DIR, 'src');

// Load manifest
if (!fs.existsSync(MANIFEST_PATH)) {
  console.log('⚠️  Asset manifest not found. Run `npm run assets:build` first.\n');
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
let totalReplacements = 0;

const config = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'))
  : {};

const sourceDirName = (config.sourceDir || 'assets-src').replace(/^\/+|\/+$/g, '');

// Access manifest structure with fallback for old format
const manifestAssets = manifest.assets || manifest;
const images = manifestAssets.images || {};
const videos = manifestAssets.videos || {};

// Find all TypeScript/JavaScript files
const tsxFiles = glob.sync(`${SRC_DIR}/**/*.{tsx,ts,jsx,js}`, {
  ignore: `${SRC_DIR}/**/node_modules/**`,
});

console.log(`🔍 Scanning ${tsxFiles.length} files for asset paths...\n`);

tsxFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let replacements = 0;

  // Replace old source-dir image paths with new /assets paths
  Object.entries(images).forEach(([originalFile, data]) => {
    const fileName = path.parse(originalFile).name;
    const originalPath = path.parse(originalFile);

    // Match patterns like "assets-src/menu.png" or "/assets-src/menu.png"
    const patterns = [
      new RegExp(`['"]\\/?${sourceDirName}/${fileName}\\${originalPath.ext}['"\\s]`, 'g'),
      new RegExp(`['"]\\/?${sourceDirName}/${fileName}\\.(png|jpg|jpeg)['"\\s]`, 'g'),
    ];

    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        // Handle manifest formats: output, outputs.webp/avif, or legacy outputs[0]
        const outputPath =
          data.output ||
          (data.outputs && data.outputs.webp) ||
          (data.outputs && data.outputs.avif) ||
          (Array.isArray(data.outputs) ? data.outputs[0] : null);
        if (outputPath) {
          content = content.replace(pattern, (match) => {
            const quote = match.includes('"') ? '"' : "'";
            return `${quote}${outputPath}${quote}`;
          });
          replacements += matches.length;
        }
      }
    });
  });

  // Replace old source-dir video paths with new /assets paths
  Object.entries(videos).forEach(([originalFile, data]) => {
    const fileName = path.parse(originalFile).name;

    // Match patterns like "assets-src/Hero.mov" or "/assets-src/Hero.mov"
    const patterns = [
      new RegExp(`['"]\\/?${sourceDirName}/${fileName}\\.[^'"\\s]+['"\\s]`, 'g'),
    ];

    patterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, (match) => {
          const quote = match.includes('"') ? '"' : "'";
          return `${quote}${data.output}${quote}`;
        });
        replacements += matches.length;
      }
    });
  });

  // Write file if changes were made
  if (replacements > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✓ ${path.relative(ROOT_DIR, filePath)}: ${replacements} replacement(s)`);
    totalReplacements += replacements;
  }
});

console.log(`\n${totalReplacements > 0 ? '✨' : 'ℹ️'} Total replacements: ${totalReplacements}\n`);
