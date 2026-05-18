# Asset Pipeline Documentation

## Overview

The unified asset pipeline automatically optimizes images and converts videos during your build process. It handles:

- **Images** → Optimized to WebP/AVIF formats (smaller file sizes, better performance)
- **Image preload metadata** → BlurHash + tiny placeholder PNG/data URI
- **Videos** → Converted to MP4 format (better compatibility)
- **Manifest** → Tracks all conversions for reference and debugging
- **Favicon (optional)** → Generated from a configured image

## Directory Structure

```
web/
├── assets-src/           # Source assets (images + videos mixed)
│   ├── menu.png
│   ├── settings.png
│   ├── Hero.mov
│   └── ...
├── public/
│   ├── assets/          # Generated assets (auto-generated)
│   │   ├── menu.webp
│   │   ├── menu.avif
│   │   ├── Hero.mp4
│   │   ├── blur/
│   │   │   └── menu.blur.png
│   │   ├── manifest.json
│   │   └── ...
│   └── (favicon files if enabled)
└── scripts/
    ├── build-assets.js      # Main unified pipeline
    └── update-asset-paths.js # Path replacement utility
```

## Usage

### 1. Standard Build (Images + Videos)

```bash
npm run build
```

This automatically:
1. Runs `npm run assets:build` (optimizes images & converts videos)
2. Builds your Next.js app with optimized assets

### 2. Asset Build Only

```bash
npm run assets:build
```

Output:
```
🔄 Asset Pipeline

📦 Images (8 found)
✓ Optimized 8 image(s)

🎬 Videos (1 found)
  → Hero.mov
    ✓ Hero.mp4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Asset Pipeline Complete

  📦 Images:  8 optimized
  🎬 Videos:  1 converted
  📋 Manifest: /public/assets/manifest.json
```

### 3. Update Asset Paths (Optional)

If you have source files referencing source assets directly:

```bash
npm run assets:update-paths
```

This scans all TypeScript/JavaScript files and replaces:
- `assets-src/menu.png` → `/assets/menu.webp` (uses manifest)
- `assets-src/Hero.mov` → `/assets/Hero.mp4` (uses manifest)

## Adding New Assets

### New Images

1. Add image file to `assets-src/` directory:
   ```bash
  cp ~/Desktop/screenshot.png web/assets-src/
   ```

2. Build (images are auto-optimized):
   ```bash
   npm run build
   ```

3. Reference in code:
   ```tsx
   <img src="/assets/screenshot.webp" alt="..." />
   ```

### New Videos

1. Add video file to `assets-src/` directory:
   ```bash
  cp ~/Desktop/intro.mov web/assets-src/
   ```

2. Build (videos are auto-converted):
   ```bash
   npm run build
   ```

3. Reference in code:
   ```tsx
  <video src="/assets/intro.mp4" />
   ```

## Asset Manifest

After each build, a manifest is generated at `public/assets/manifest.json`:

```json
{
  "assets": {
    "images": {
      "menu.png": {
        "source": "assets-src/menu.png",
        "outputs": {
          "webp": "/assets/menu.webp",
          "avif": "/assets/menu.avif"
        },
        "blurHash": "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
        "placeholder": {
          "dataUri": "data:image/png;base64,...",
          "file": "/assets/blur/menu.blur.png"
        }
      }
    },
    "videos": {
      "Hero.mov": {
        "source": "assets-src/Hero.mov",
        "output": "/assets/Hero.mp4"
      }
    }
  },
  "timestamp": "2026-04-03T23:59:50.222Z"
}
```

Use this manifest for:
- Debugging asset conversions
- Tracking file sizes and formats
- Integrating with other tools

## Image Optimization Details

**Tool**: `asset-forge optimize`  
**Quality**: 95 (0-100 scale)  
**Formats**: WebP + AVIF (for maximum compatibility)

## Image Placeholder Details

- **BlurHash**: `asset-forge blur-hash`
- **Tiny placeholder**: `asset-forge placeholder`
- Stored per image in `manifest.json` for easy preload/skeleton usage.

All images are optimized to:
- WebP: Better compression, wider support
- AVIF: Even better compression, newer format

Recommended: Use WebP in production (`/assets/filename.webp`)

## Video Conversion Details

**Tool**: `asset-forge convert-video` + ffmpeg  
**Quality**: CRF 23 (0-51 scale, lower = better)  
**Formats**: MP4 H.264 + WebM VP9 + WebP poster frame

Each video produces three outputs:
- `{name}.mp4` — H.264, maximum browser compatibility
- `{name}.webm` — VP9, 30-50% smaller at same quality for Chrome/Firefox/Edge
- `{name}-poster.webp` — First frame as WebP, shown instantly before video loads

**FFmpeg**: Uses Homebrew `/opt/homebrew/bin/ffmpeg` on macOS

## Environment Variables

### FFMPEG_BIN

Override FFmpeg binary location:

```bash
# Use system ffmpeg
FFMPEG_BIN=/usr/bin/ffmpeg npm run assets:build

# Use Homebrew ffmpeg (default on macOS)
FFMPEG_BIN=/opt/homebrew/bin/ffmpeg npm run assets:build

# Use custom path
FFMPEG_BIN=/path/to/ffmpeg npm run assets:build
```

## Troubleshooting

### "No source directory found"

Create the directories:
```bash
mkdir -p web/assets-src
```

### FFmpeg Error

Ensure FFmpeg is installed:
```bash
# macOS with Homebrew
brew install ffmpeg

# Verify installation
which ffmpeg
```

### Manifest Not Generated

Run the asset build:
```bash
npm run assets:build
```

The manifest is generated automatically in `public/assets/manifest.json`

## Performance Tips

1. **Use WebP/AVIF in production** — Smaller files, faster loading
2. **Preload critical images** — Add to Next.js layout:
   ```tsx
   <link rel="preload" href="/assets/hero.webp" as="image" />
   ```
3. **Lazy load non-critical images** — Use Next.js Image component with `loading="lazy"`
4. **Video optimization** — Keep source videos under 100MB for faster conversion

## Integration with CI/CD

The asset pipeline runs automatically during any build:

```bash
# GitHub Actions, GitLab CI, etc.
npm run build  # Runs assets:build → next build
```

Converted assets are part of your deployment artifact and served directly by your web server.

## Related Scripts

- `npm run dev` — Start development server (uses latest built assets)
- `npm run lint` — Lint source code
- `npm run start` — Start production server
