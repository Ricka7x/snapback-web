# Asset Pipeline - Multi-Project Setup Guide

This is a **reusable asset pipeline** that works across **Next.js, Vite, SvelteKit, and any Node-based framework**.

## Quick Start (Copy to Another Project)

### 1. Copy Files to Your Project

```bash
# Copy the scripts
mkdir -p scripts/
cp scripts/build-assets.js your-project/scripts/
cp build-assets.config.json your-project/

# Or just copy the config and reference the shared script
```

### 2. Update Your `package.json`

```json
{
  "scripts": {
    "assets:build": "node scripts/build-assets.js",
    "build": "npm run assets:build && <your-framework-build-cmd>"
  },
  "devDependencies": {
    "@ricka7x/asset-forge": "^0.3.4"
  }
}
```

### 3. Create Source Directories

```bash
mkdir -p assets-src
```

### 4. Configure (Optional)

Edit `build-assets.config.json` for your project structure:

```json
{
  "name": "my-project",
  "sourceDir": "assets-src",      // Mixed source assets live here
  "outputDir": "public/assets",   // Generated assets live here
  "imageQuality": 95,             // 0-100, higher = better quality
  "videoQuality": 23,             // 0-51, lower = better quality
  "blurPlaceholders": true,
  "blurPlaceholderOutputDir": "public/assets/blur",
  "favicon": {
    "enabled": false,
    "source": "logo.png",
    "outputDir": "public"
  },
  "generateManifest": true        // Creates manifest.json for tracking
}
```

### 5. Run

```bash
npm run build
# or just images
npm run assets:build
```

---

## Project-Specific Examples

### Next.js (App Router)

```json
{
  "name": "my-nextjs-app",
  "sourceDir": "assets-src",
  "outputDir": "public/assets"
}
```

**package.json:**
```json
{
  "scripts": {
    "assets:build": "node scripts/build-assets.js",
    "build": "npm run assets:build && next build"
  }
}
```

### Vite + React

```json
{
  "name": "vite-react-app",
  "sourceDir": "assets-src",
  "outputDir": "public/assets",
  "imageQuality": 85,
  "videoQuality": 23
}
```

**package.json:**
```json
{
  "scripts": {
    "assets:build": "node scripts/build-assets.js",
    "build": "npm run assets:build && vite build"
  }
}
```

### SvelteKit

```json
{
  "name": "sveltekit-app",
  "sourceDir": "assets-src",
  "outputDir": "static/assets"
}
```

**package.json:**
```json
{
  "scripts": {
    "assets:build": "node scripts/build-assets.js",
    "build": "npm run assets:build && vite build"
  }
}
```

### Astro

```json
{
  "name": "astro-site",
  "sourceDir": "assets-src",
  "outputDir": "public/assets"
}
```

**package.json:**
```json
{
  "scripts": {
    "assets:build": "node scripts/build-assets.js",
    "build": "npm run assets:build && astro build"
  }
}
```

---

## Configuration Reference

### `build-assets.config.json`

```json
{
  "name": "project-name",
  
  // Directory paths (relative to project root)
  "sourceDir": "assets-src",      // Mixed source assets
  "outputDir": "public/assets",   // Generated assets
  
  // Quality settings
  "imageQuality": 95,           // 0-100 (higher = better quality, larger file)
  "videoQuality": 23,           // 0-51 (lower = better quality, larger file)

  // Blur preload metadata
  "blurPlaceholders": true,
  "blurPlaceholderWidth": 20,
  "blurPlaceholderOutputDir": "public/assets/blur",

  // Optional favicon generation
  "favicon": {
    "enabled": false,
    "source": "logo.png",
    "outputDir": "public"
  },
  
  // File extensions to process
  "extensions": {
    "images": [".png", ".jpg", ".jpeg"],
    "videos": [".mov", ".mp4", ".webm", ".avi", ".mkv"]
  },
  
  // Features
  "generateManifest": true,     // Create manifest.json for tracking
  "verbose": false,             // Detailed logging
  
  // FFmpeg binary path
  "ffmpegBin": "/opt/homebrew/bin/ffmpeg"  // macOS Homebrew default
}
```

---

## Environment Variables

Override config per-run without editing files:

```bash
# Override ffmpeg location
FFMPEG_BIN=/usr/bin/ffmpeg npm run build

# Custom output directory
npm run assets:build

# Enable verbose logging
node scripts/build-assets.js
```

---

## Asset Manifest

After each build, `manifest.json` is created:

```json
{
  "project": "my-project",
  "config": {
    "source": "assets-src",
    "output": "public/assets",
    "imageQuality": 95,
    "videoQuality": 23
  },
  "assets": {
    "images": {
      "hero.png": {
        "source": "assets-src/hero.png",
        "outputs": {
          "webp": "/assets/hero.webp",
          "avif": "/assets/hero.avif"
        },
        "blurHash": "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
        "placeholder": {
          "dataUri": "data:image/png;base64,...",
          "file": "/assets/blur/hero.blur.png"
        }
      }
    },
    "videos": {
      "intro.mov": {
        "source": "assets-src/intro.mov",
        "output": "/assets/intro.mp4"
      }
    }
  },
  "timestamp": "2026-04-03T23:59:50.222Z"
}
```

Use this for:
- Tracking file formats generated
- Verifying conversions
- Debugging build issues
- CI/CD validation

---

## Workflow

### For Developers

1. **Add assets to source directories:**
   ```bash
  cp ~/Desktop/screenshot.png assets-src/
  cp ~/Desktop/intro.mov assets-src/
   ```

2. **Build (assets auto-optimize):**
   ```bash
   npm run build
   ```

3. **Reference in code:**
   ```tsx
   <img src="/assets/screenshot.webp" alt="..." />
  <video src="/assets/intro.mp4" />
   ```

### For CI/CD

```bash
# GitHub Actions example
- name: Build assets
  run: npm run assets:build

- name: Build app
  run: npm run build

- name: Verify
  run: test -f build/assets/manifest.json
```

---

## Quality Settings Guide

### Images

- **95** → Production quality (recommended)
- **80-90** → Good balance of quality/size
- **70-80** → Smaller files, visible quality loss
- **<70** → Noticeable degradation

**Default outputs:** WebP (modern) + AVIF (best compression)

### Videos

- **18-23** → High quality (CRF is inverse scale)
- **23** → Default, good balance
- **28-35** → Smaller files, quality loss
- **>40** → Heavily compressed

**Default output:** MP4 H.264 (maximum compatibility)

---

## Troubleshooting

### "No source directory"

```bash
mkdir -p assets-src
```

### FFmpeg Error

**macOS:**
```bash
brew install ffmpeg
# Update config with path if needed
```

**Linux:**
```bash
apt-get install ffmpeg
```

**Windows:**
Download from https://ffmpeg.org/ or use scoop: `scoop install ffmpeg`

### Files Not Being Processed

Check config `extensions` matches your file types:

```json
{
  "extensions": {
    "images": [".png", ".jpg", ".jpeg", ".webp"],
    "videos": [".mov", ".mp4", ".webm", ".avi", ".mkv", ".m4v"]
  }
}
```

### Manifest Not Created

Enable `generateManifest` in config:

```json
{
  "generateManifest": true
}
```

---

## Advanced Usage

### Skip Certain Formats

Edit extensions:

```json
{
  "extensions": {
    "images": [".png"],  // Only process PNG
    "videos": []         // Skip videos entirely
  }
}
```

### Custom Scripts

Extend the pipeline for your needs:

```bash
# Process only images
npm run assets:build  # Runs image optimization

# Then deploy
npm run build
```

---

## Integration with Next.js Image Component

**Best practice** — Use optimized WEBP in modern browsers:

```tsx
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/assets/hero.webp"
      alt="Hero"
      width={1200}
      height={600}
      priority
    />
  )
}
```

**With fallback:**
```tsx
<picture>
  <source srcSet="/assets/hero.avif" type="image/avif" />
  <source srcSet="/assets/hero.webp" type="image/webp" />
  <img src="/assets/hero.png" alt="Hero" />
</picture>
```

---

## Notes

- **Config is per-project** — Each project has its own `build-assets.config.json`
- **FFmpeg required for videos** — Install via Homebrew/apt/Windows installer
- **Manifest is optional** — Set `generateManifest: false` to skip creating it
- **Asset-forge installed as devDependency** — No global install needed
- **Framework-agnostic** — Works with any Node-based build system

---

## Support

- **asset-forge docs:** https://github.com/Ricka7x/asset-forge
- **FFmpeg docs:** https://ffmpeg.org/documentation.html
