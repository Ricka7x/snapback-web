# Assets Source Folder

**Drop your images and videos here.** The build pipeline handles the rest.

## Supported Formats

**Images:**
- `.png`, `.jpg`, `.jpeg`

**Videos:**
- `.mov`, `.mp4`, `.webm`, `.avi`, `.mkv`

## What Happens

When you run `npm run assets:build`:

1. **Images** → Optimized to `.webp` + `.avif` (95% quality by default)
2. **Image preload metadata** → `blurHash` + tiny placeholder PNG/data URI
3. **Videos** → Converted to `.mp4` (quality 23 by default)
4. **Output** → All generated assets go to `public/assets/`
5. **Manifest** → `public/assets/manifest.json` tracks all conversions
6. **Optional favicon** → Generated in `public/` if enabled in config

## Example

```bash
# Drop files here
assets-src/
  ├── hero.mov
  ├── banner.png
  ├── logo.jpg
  └── intro.webm

# Run build
npm run assets:build

# Output in public/assets/
public/assets/
  ├── hero.mp4
  ├── banner.webp
  ├── banner.avif
  ├── blur/
  │   └── banner.blur.png
  ├── logo.webp
  ├── logo.avif
  ├── intro.mp4
  └── manifest.json  # Tracks conversions
```

## Configuration

Edit `build-assets.config.json` to customize:
- Quality levels
- Supported extensions
- FFmpeg binary path
- Output folder location
- Blur placeholder generation
- Optional favicon generation

## Full Build

```bash
npm run build  # Assets → Next.js build
```

Or just assets:

```bash
npm run assets:build
```

---

**Pro Tip:** Your source files stay here. Optimized versions go to `public/assets/` for serving.
