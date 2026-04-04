# Asset Pipeline Setup Complete ✅

## What You Have

A unified, single-folder asset pipeline that auto-detects and optimizes everything:

```
assets-src/           ← Drop images & videos here
  ├── Hero.mov
  ├── banner.png
  └── ...

npm run assets:build  ← Runs automatically before Next.js build

public/assets/        ← Optimized output
  ├── Hero.mp4
  ├── banner.webp & .avif
  ├── manifest.json
  └── ...
```

## Current Status

| Component | Status | Details |
|-----------|--------|---------|
| **Pipeline** | ✅ Ready | Single-folder auto-detection, images + videos |
| **Source Folder** | ✅ Created | `assets-src/` with Hero.mov (test file) |
| **Build Script** | ✅ Updated | `npm run assets:build` processes everything |
| **Configuration** | ✅ Simplified | Single `sourceDir` + auto-detection by extension |
| **Output** | ✅ Working | All optimized files in `public/assets/` |
| **Manifest** | ✅ Generated | Tracks image & video conversions separately |
| **Integration** | ✅ Complete | Runs automatically in `npm run build` |

## How to Use

### 1. Add Assets
Drop images/videos into `assets-src/`:
```bash
cp ~/Desktop/myimage.png assets-src/
cp ~/Desktop/myvideo.mov assets-src/
```

### 2. Build
```bash
npm run assets:build
```

Output appears in `public/assets/`:
```
Hero.mp4           (from Hero.mov)
myimage.webp       (from myimage.png)
myimage.avif       (from myimage.png)
manifest.json      (tracks everything)
```

### 3. Use in Component
```tsx
<img src="/assets/myimage.webp" alt="..." />
<video src="/assets/Hero.mp4" />
```

## Configuration

Edit `build-assets.config.json` to customize:

```json
{
  "sourceDir": "assets-src",        ← Add images/videos here
  "outputDir": "public/assets",     ← Optimized output
  "imageQuality": 95,               ← Higher = better quality
  "videoQuality": 23,               ← Lower = better quality
  "extensions": {
    "images": [".png", ".jpg", ".jpeg"],
    "videos": [".mov", ".mp4", ".webm", ".avi", ".mkv"]
  }
}
```

## Commands

```bash
# Build only assets (no Next.js)
npm run assets:build

# Full build (assets → Next.js)
npm run build

# Check output
ls -lh public/assets/
cat public/assets/manifest.json
```

## Next Steps

1. **Add Your Assets** → Put images/videos in `assets-src/`
2. **Test the Pipeline** → Run `npm run assets:build`
3. **Use in Components** → Reference `/assets/{filename}.{webp|avif|mp4}` in JSX
4. **Full Build** → Run `npm run build` to build everything

## Architecture

- **Simple**: Drop files, auto-detect, build
- **Fast**: Runs before Next.js (turbopack parallel)
- **Flexible**: Config-driven, works across projects
- **Transparent**: Manifest shows all conversions

## Reusing on Other Projects

Copy these files to your next project:
- `build-assets.js`
- `build-assets.config.json`
- `assets-src/` (folder structure)

Update `build-assets.config.json` with your project's paths, then:
```bash
npm install -D @ricka7x/asset-forge
npm run assets:build
```

See `REUSABLE_SETUP.md` for detailed multi-project examples.

---

**Status**: Ready to optimize your assets! 🚀
