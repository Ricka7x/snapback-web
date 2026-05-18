#!/usr/bin/env node
/**
 * Unified Asset Pipeline (Reusable)
 * 
 * Framework-agnostic asset build system using asset-forge programmatic API
 * Works with Next.js, Vite, SvelteKit, or any Node-based build system
 * 
 * Configuration: See build-assets.config.json (customize per project)
 * Global Config: ~/.config/asset-forge/config.json (shared across projects)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Load project config
const CONFIG_PATH = path.join(__dirname, '..', 'build-assets.config.json');
let config = {
  name: path.basename(path.dirname(__dirname)),
  sourceDir: 'assets-src',
  outputDir: 'public/assets',
  imageQuality: 95,
  videoQuality: 23,
  ffmpegBin: process.env.FFMPEG_BIN || '/opt/homebrew/bin/ffmpeg',
  blurPlaceholders: true,
  blurPlaceholderWidth: 20,
  blurPlaceholderOutputDir: 'public/assets/blur',
  favicon: {
    enabled: false,
    source: 'logo.png',
    outputDir: 'public',
  },
  extensions: {
    images: ['.png', '.jpg', '.jpeg'],
    videos: ['.mov', '.mp4', '.webm', '.avi', '.mkv'],
  },
  generateManifest: true,
  verbose: false,
};

if (fs.existsSync(CONFIG_PATH)) {
  const userConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  config = { ...config, ...userConfig };
  if (config.verbose) {
    console.log('📋 Loaded config:', config);
  }
}

const ROOT_DIR = path.join(__dirname, '..');
const SOURCE_DIR = path.join(ROOT_DIR, config.sourceDir);
const OUTPUT_DIR = path.join(ROOT_DIR, config.outputDir);
const BLUR_OUTPUT_DIR = path.join(ROOT_DIR, config.blurPlaceholderOutputDir);

function toPublicUrl(absPath) {
  const publicDir = path.join(ROOT_DIR, 'public');
  const rel = path.relative(publicDir, absPath).replace(/\\/g, '/');
  return `/${rel}`;
}

const log = {
  info: (msg) => console.log(msg),
  error: (msg) => console.error(`✗ ${msg}`),
  verbose: (msg) => config.verbose && console.log(`  → ${msg}`),
};

// Asset manifest to track all conversions
const assetManifest = {
  project: config.name,
  config: {
    source: config.sourceDir,
    output: config.outputDir,
    imageQuality: config.imageQuality,
    videoQuality: config.videoQuality,
    blurPlaceholders: config.blurPlaceholders,
    blurPlaceholderWidth: config.blurPlaceholderWidth,
    blurPlaceholderOutputDir: config.blurPlaceholderOutputDir,
    favicon: config.favicon,
  },
  assets: {
    images: {},
    videos: {},
    favicon: null,
  },
  timestamp: new Date().toISOString(),
};

console.log('🔄 Asset Pipeline\n');

/**
 * Process images from source directory
 */
function processImages(allFiles) {
  const imageFiles = allFiles.filter(file =>
    config.extensions.images.includes(path.extname(file).toLowerCase())
  );

  if (imageFiles.length === 0) return 0;

  log.info(`📦 Images (${imageFiles.length} found)\n`);

  // Write images to temp file for batch processing
  try {
    const cmd = `cd "${SOURCE_DIR}" && asset-forge optimize . "${OUTPUT_DIR}" ${config.imageQuality}`;
    execSync(cmd, {
      stdio: 'inherit',
      cwd: SOURCE_DIR,
    });

    // Track all image conversions
    const outDirName = path.basename(config.outputDir);
    fs.mkdirSync(BLUR_OUTPUT_DIR, { recursive: true });

    imageFiles.forEach(file => {
      const baseName = path.parse(file).name;
      const sourcePath = path.join(SOURCE_DIR, file);
      let blurHash = null;
      let placeholderDataUri = null;
      let placeholderFile = null;

      try {
        const blurHashCmd = `npx asset-forge blur-hash "${sourcePath}"`;
        const blurHashStdout = execSync(blurHashCmd, {
          cwd: ROOT_DIR,
          encoding: 'utf-8',
          stdio: ['pipe', 'pipe', 'pipe'],
        });

        blurHash = blurHashStdout
          .split('\n')
          .map(line => line.trim())
          .find(line => line.length > 0 && !line.includes('Generated') && !line.startsWith('Warning')) || null;
      } catch (error) {
        log.verbose(`BlurHash generation failed for ${file}: ${error.message}`);
      }

      if (config.blurPlaceholders) {
        try {
          const placeholderOutputPath = path.join(BLUR_OUTPUT_DIR, `${baseName}.blur.png`);
          const placeholderCmd = `npx asset-forge placeholder "${sourcePath}" "${placeholderOutputPath}"`;
          const placeholderStdout = execSync(placeholderCmd, {
            cwd: ROOT_DIR,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe'],
          });

          const dataUriLine = placeholderStdout
            .split('\n')
            .map(line => line.trim())
            .find(line => line.startsWith('data:image/'));

          if (dataUriLine) {
            placeholderDataUri = dataUriLine;
            placeholderFile = toPublicUrl(placeholderOutputPath);
          }
        } catch (error) {
          log.verbose(`Placeholder generation failed for ${file}: ${error.message}`);
        }
      }

      assetManifest.assets.images[file] = {
        source: `${config.sourceDir}/${file}`,
        outputs: {
          webp: `/${outDirName}/${baseName}.webp`,
          avif: `/${outDirName}/${baseName}.avif`,
        },
        blurHash,
        placeholder: placeholderDataUri
          ? {
              dataUri: placeholderDataUri,
              file: placeholderFile,
            }
          : null,
        size: fs.statSync(sourcePath).size,
      };
    });

    log.info(`✓ Optimized ${imageFiles.length} image(s)\n`);
    return imageFiles.length;
  } catch (error) {
    log.error(`Image processing failed: ${error.message}`);
    throw error;
  }
}

/**
 * Optionally generate favicon assets from a source image
 */
function processFavicon(allFiles) {
  if (!config.favicon || !config.favicon.enabled) return false;

  const imageCandidates = allFiles.filter(file =>
    config.extensions.images.includes(path.extname(file).toLowerCase())
  );

  if (imageCandidates.length === 0) return false;

  const configuredSource = config.favicon.source;
  const fallbackSource = imageCandidates.find(file => /logo|icon|favicon/i.test(file)) || imageCandidates[0];
  const sourceFile = configuredSource || fallbackSource;

  const sourcePath = path.isAbsolute(sourceFile)
    ? sourceFile
    : path.join(SOURCE_DIR, sourceFile);

  if (!fs.existsSync(sourcePath)) {
    log.error(`Favicon source not found: ${sourcePath}`);
    return false;
  }

  const faviconOutputDir = path.join(ROOT_DIR, (config.favicon.outputDir || 'public'));
  fs.mkdirSync(faviconOutputDir, { recursive: true });

  try {
    log.info(`🧩 Favicon (${path.basename(sourcePath)})\n`);
    const cmd = `npx asset-forge favicon "${sourcePath}" "${faviconOutputDir}"`;
    execSync(cmd, { stdio: 'inherit', cwd: ROOT_DIR });

    assetManifest.assets.favicon = {
      source: path.relative(ROOT_DIR, sourcePath),
      outputDir: path.relative(ROOT_DIR, faviconOutputDir),
    };

    log.info(`✓ Favicon generated\n`);
    return true;
  } catch (error) {
    log.error(`Favicon generation failed: ${error.message}`);
    return false;
  }
}

/**
 * Process videos from source directory
 */
function processVideos(allFiles) {
  const videoFiles = allFiles.filter(file =>
    config.extensions.videos.includes(path.extname(file).toLowerCase())
  );

  if (videoFiles.length === 0) return 0;

  log.info(`🎬 Videos (${videoFiles.length} found)\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let converted = 0;
  const outDirName = path.basename(config.outputDir);

  for (const file of videoFiles) {
    const inputPath = path.join(SOURCE_DIR, file);
    const baseName = path.parse(file).name;
    const outputFile = baseName + '.mp4';
    const webmOutputFile = baseName + '.webm';
    const posterFile = baseName + '-poster.webp';
    const outputPath = path.join(OUTPUT_DIR, outputFile);
    const webmOutputPath = path.join(OUTPUT_DIR, webmOutputFile);
    const posterPath = path.join(OUTPUT_DIR, posterFile);

    if (!fs.existsSync(inputPath)) continue;

    try {
      log.info(`  → ${file}`);

      // MP4 (H.264)
      const mp4Cmd = `FFMPEG_BIN="${config.ffmpegBin}" npx asset-forge convert-video "${inputPath}" "${outputPath}" ${config.videoQuality}`;
      execSync(mp4Cmd, { stdio: 'pipe', cwd: ROOT_DIR });
      log.info(`    ✓ ${outputFile}`);

      // WebM (VP9) — smaller at same perceptual quality for supporting browsers
      const webmCmd = `FFMPEG_BIN="${config.ffmpegBin}" npx asset-forge convert-video "${inputPath}" "${webmOutputPath}" ${config.videoQuality}`;
      execSync(webmCmd, { stdio: 'pipe', cwd: ROOT_DIR });
      log.info(`    ✓ ${webmOutputFile}`);

      // Poster frame — first frame as WebP for instant visual before video loads
      const posterCmd = `${config.ffmpegBin} -y -i "${inputPath}" -ss 0 -vframes 1 -vcodec libwebp -lossless 0 -quality 85 "${posterPath}"`;
      execSync(posterCmd, { stdio: 'pipe', cwd: ROOT_DIR });
      log.info(`    ✓ ${posterFile}\n`);

      converted++;

      assetManifest.assets.videos[file] = {
        source: `${config.sourceDir}/${file}`,
        outputs: {
          mp4: `/${outDirName}/${outputFile}`,
          webm: `/${outDirName}/${webmOutputFile}`,
          poster: `/${outDirName}/${posterFile}`,
        },
        size: fs.statSync(inputPath).size,
      };
    } catch (error) {
      log.error(`Failed to process ${file}: ${error.message}`);
    }
  }

  return converted;
}

/**
 * Main pipeline
 */
function run() {
  try {
    if (!fs.existsSync(SOURCE_DIR)) {
      log.info(`ℹ️  Source directory not found: ${config.sourceDir}/\n`);
      log.info(`Create it and add your assets:\n  mkdir -p ${config.sourceDir}\n`);
      process.exit(0);
    }

    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // Get all files to process
    const allFiles = fs.readdirSync(SOURCE_DIR).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return config.extensions.images.includes(ext) || 
             config.extensions.videos.includes(ext);
    });

    if (allFiles.length === 0) {
      log.info(`ℹ️  No assets found in ${config.sourceDir}/\n`);
      process.exit(0);
    }

    log.info('🔄 Asset Pipeline\n');

    const imageCount = processImages(allFiles);
    const videoCount = processVideos(allFiles);
    const faviconGenerated = processFavicon(allFiles);

    // Write manifest
    if (config.generateManifest) {
      const manifestPath = path.join(OUTPUT_DIR, 'manifest.json');
      fs.writeFileSync(manifestPath, JSON.stringify(assetManifest, null, 2));
    }

    console.log('━'.repeat(50));
    console.log(`\n✨ Asset Pipeline Complete\n`);
    console.log(`  📦 Images:  ${imageCount} optimized`);
    console.log(`  🎬 Videos:  ${videoCount} converted`);
    console.log(`  🧩 Favicon: ${faviconGenerated ? 'generated' : 'skipped'}`);
    console.log(`  📂 Output:  ${path.relative(ROOT_DIR, OUTPUT_DIR)}/`);
    if (config.generateManifest) {
      console.log(`  📋 Manifest: ${path.relative(ROOT_DIR, path.join(OUTPUT_DIR, 'manifest.json'))}`);
    }
    console.log(`\n`);

    process.exit(0);
  } catch (error) {
    console.error(`\n✗ Pipeline failed: ${error.message}\n`);
    process.exit(1);
  }
}

run();
