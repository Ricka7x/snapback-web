# Asset Pipeline - Setup Summary

This project now uses a single source folder pipeline.

## Current Model

- Source folder: `assets-src/`
- Output folder: `public/assets/`
- Build command: `npm run assets:build`
- Full build: `npm run build`

The pipeline auto-detects file types by extension and processes everything in one pass.

## What It Generates

For images (`.png`, `.jpg`, `.jpeg`):
- Optimized `.webp`
- Optimized `.avif`
- BlurHash (`asset-forge blur-hash`)
- Tiny placeholder PNG + data URI (`asset-forge placeholder`)

For videos (`.mov`, `.mp4`, `.webm`, `.avi`, `.mkv`):
- Converted `.mp4`

Optional:
- Favicon set (`asset-forge favicon`) when enabled in config

## Directory Layout

```text
web/
├── assets-src/                 # Drop source assets here
├── public/
│   ├── assets/
│   │   ├── *.webp
│   │   ├── *.avif
│   │   ├── *.mp4
│   │   ├── blur/*.blur.png
│   │   └── manifest.json
│   └── (favicon files when enabled)
├── scripts/
│   ├── build-assets.js
│   └── update-asset-paths.js
└── build-assets.config.json
```

## Config Shape

```json
{
  "name": "snapback-web",
  "sourceDir": "assets-src",
  "outputDir": "public/assets",
  "imageQuality": 95,
  "videoQuality": 23,
  "blurPlaceholders": true,
  "blurPlaceholderWidth": 20,
  "blurPlaceholderOutputDir": "public/assets/blur",
  "favicon": {
    "enabled": false,
    "source": "logo.png",
    "outputDir": "public"
  },
  "ffmpegBin": "/opt/homebrew/bin/ffmpeg",
  "extensions": {
    "images": [".png", ".jpg", ".jpeg"],
    "videos": [".mov", ".mp4", ".webm", ".avi", ".mkv"]
  },
  "generateManifest": true,
  "verbose": false
}
```

## Manifest Shape

`public/assets/manifest.json` now uses:

```json
{
  "project": "snapback-web",
  "config": {
    "source": "assets-src",
    "output": "public/assets"
  },
  "assets": {
    "images": {
      "banner.png": {
        "source": "assets-src/banner.png",
        "outputs": {
          "webp": "/assets/banner.webp",
          "avif": "/assets/banner.avif"
        },
        "blurHash": "LKO2?U%2Tw=w]~RBVZRi};RPxuwH",
        "placeholder": {
          "dataUri": "data:image/png;base64,...",
          "file": "/assets/blur/banner.blur.png"
        },
        "size": 123456
      }
    },
    "videos": {
      "Hero.mov": {
        "source": "assets-src/Hero.mov",
        "output": "/assets/Hero.mp4",
        "size": 4147494
      }
    },
    "favicon": null
  }
}
```

## Path Replacement Script

Use:

```bash
npm run assets:update-paths
```

It reads `sourceDir` from `build-assets.config.json` and updates legacy source references to generated `/assets/...` paths.

## Notes

- If you enable favicon generation, set `favicon.source` to an image that exists in `assets-src/` (or an absolute path).
