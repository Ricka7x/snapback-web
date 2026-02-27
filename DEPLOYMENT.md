# Production Release Automation Guide

## Overview

This guide covers the complete automated build and release pipeline for Snapback. The system handles:

- 🏗️ Automated builds from Xcode source code
- 📦 App archiving and packaging  
- 🔗 Release distribution via Sparkle
- 📋 Appcast.xml generation
- 🔄 Git automation and CI/CD

## Quick Start

### Automated One-Command Release

The simplest way to build and release is using the main script:

```bash
cd /Users/ricka7x/Projects/snapback-web
./scripts/build-and-release.sh
```

This runs the entire pipeline:

1. Validates your environment
2. Extracts version from Info.plist
3. Builds and archives the Xcode project
4. Exports the app bundle
5. Creates a release zip
6. Generates the Sparkle appcast
7. Commits changes to git

### With Options

```bash
# Test without making changes
./scripts/build-and-release.sh --dry-run

# Skip git commit/push (manual control)
./scripts/build-and-release.sh --skip-git

# Include release notes
./scripts/build-and-release.sh --release-notes ./notes/v1.0.0.html

# Verbose output
./scripts/build-and-release.sh --verbose
```

## Security Best Practices

**Q: Is it safe to commit URLs in config.sh?**

**A: Yes, but with guidelines:**

✅ **Safe to commit:**
- Public website URLs (`https://snapbackapp.com`)
- Public download URLs (users need these to update)
- Project paths on your machine
- Schema and build configuration

❌ **Never commit:**
- API keys or tokens
- Private EdDSA signing keys
- Credentials or passwords
- Staging/test server URLs (if meant to be hidden)
- Personal information

### Handling Sensitive Configuration

For sensitive values, use **environment variables** instead:

```bash
# Option 1: Use environment variables at runtime
export DOWNLOAD_URL_PREFIX="https://private-cdn.example.com/releases"
export SPARKLE_ED_KEY_FILE="$HOME/.sparkle/private.key"
./scripts/build-and-release.sh

# Option 2: Use local .env.local (in .gitignore, never committed)
source .env.local
./scripts/build-and-release.sh
```

### Setup Local Overrides

1. **Copy the template:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit with your sensitive values:**
   ```bash
   nano .env.local
   ```

3. **Source before running:**
   ```bash
   source .env.local && ./scripts/build-and-release.sh
   ```

The `.env.local` file is in `.gitignore` and will never be committed to version control.

### Production CI/CD

For GitHub Actions or other CI/CD systems, use **secrets management**:

- GitHub Actions: Settings → Secrets → New repository secret
- Other CI/CD: Use your platform's secure environment variable features
- Never log or echo sensitive values

## Manual Release Steps

If you prefer more control, execute each step manually:

### 1. Build and Export

```bash
# Just do the build (output at /tmp/snapback-build/)
cd /Users/ricka7x/XcodeProjects/Snapback
xcodebuild -scheme Snapback -configuration Release archive \
  -archivePath /tmp/Snapback.xcarchive

# Export the app
xcodebuild -exportArchive \
  -archivePath /tmp/Snapback.xcarchive \
  -exportOptionsPlist ExportOptions.plist \
  -exportPath /tmp/Export
```

### 2. Create Release

Zip the app with correct naming (Snapback-X.Y.Z.zip):

```bash
ditto -c -k --sequesterRsrc /tmp/Export/Snapback.app \
  /tmp/Snapback-1.0.0.zip
```

### 3. Add Release to Repository

```bash
cd /Users/ricka7x/Projects/snapback-web

# Add the release
./scripts/release.sh /tmp/Snapback-1.0.0.zip

# Or with release notes
./scripts/release.sh /tmp/Snapback-1.0.0.zip \
  --release-notes ./release-notes/1.0.0.html
```

### 4. Publish

```bash
cd /Users/ricka7x/Projects/snapback-web

# Review changes
git status

# Commit (if not done automatically)
git add releases/
git commit -m "chore(release): Snapback v1.0.0"

# Push to production
git push origin main
```

## Configuration

All settings are in `scripts/config.sh`:

| Setting | Default | Details |
|---------|---------|---------|
| `XCODE_PROJECT_PATH` | /Users/ricka7x/XcodeProjects/Snapback | Path to Xcode project |
| `XCODE_SCHEME` | Snapback | Build scheme name |
| `INFO_PLIST` | Snapback/Info.plist | Version source |
| `RELEASES_DIR` | {project_root}/releases | Release storage |
| `DOWNLOAD_URL_PREFIX` | https://snapbackapp.com/releases | CDN URL |

To customize, edit `scripts/config.sh` before running release scripts.

## Sparkle Binary Configuration

The system automatically detects Sparkle in this order:

1. **Environment variable**: `SPARKLE_TOOLS_PATH`
2. **Xcode DerivedData**: Latest Snapback build
3. **Homebrew**: `/usr/local/opt/sparkle/bin` (Intel) or `/opt/homebrew/opt/sparkle/bin` (Apple Silicon)
4. **Local build**: `~/.local/sparkle/bin`
5. **PATH**: System-wide installation

### Install Sparkle

If not found, install via Homebrew:

```bash
# Intel Mac
brew install sparkle

# Apple Silicon
brew install sparkle --arch=arm64
```

Or build with Xcode SPM dependency.

## Release Notes

You can optionally include release notes with each release:

### HTML Format

Create `release-notes/v1.0.0.html`:

```html
<h2>What's New in Snapback 1.0.0</h2>
<ul>
  <li>🎉 Initial release</li>
  <li>✨ Window snapping with keyboard shortcuts</li>
  <li>⚙️ Customizable snap positions</li>
  <li>🔧 Bug fixes and improvements</li>
</ul>
```

### Plain Text Format

Create `release-notes/v1.0.0.txt`:

```
Snapback 1.0.0

New Features:
- Initial release
- Window snapping with keyboard shortcuts
- Customizable snap positions

Bug Fixes:
- Fixed crash on startup
- Improved performance
```

Then include with:

```bash
./scripts/release.sh Snapback-1.0.0.zip \
  --release-notes ./release-notes/v1.0.0.html
```

## Version Management

The build system automatically reads the version from your Info.plist:

```xml
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
```

Update this value in Xcode before building, and the rest is automatic.

You can override with `--version`:

```bash
./scripts/build-and-release.sh --version 1.0.0
```

## GitHub Actions Automation

The `.github/workflows/generate-appcast.yml` workflow automatically:

1. **Triggers** when you push new releases to the `releases/` folder
2. **Finds** the Sparkle binary  
3. **Generates** the appcast.xml
4. **Commits** changes back to the repo
5. **Publishes** to GitHub Pages

No manual intervention needed - just push and the feed updates automatically.

## EdDSA Signing (Advanced)

For security, you can sign releases with an EdDSA key:

```bash
# Generate a key pair (one-time setup)
/path/to/sparkle/bin/generate_keys

# Use private key for releases
./scripts/build-and-release.sh \
  --ed-key-file ~/.sparkle/sparkle_private_key.pem
```

The public key should be set in your app's Info.plist:

```xml
<key>SUPublicEDKey</key>
<string>[BASE64_PUBLIC_KEY_HERE]</string>
```

## Troubleshooting

### Build Fails

Check the log file:

```bash
cat build.log
```

Common issues:

- Missing Xcode command line tools: `xcode-select --install`
- Missing Info.plist: Verify path in `config.sh`
- Build configuration: Check scheme name and configuration

### Sparkle Not Found

```bash
# Option 1: Install Homebrew package
brew install sparkle

# Option 2: Set environment variable
export SPARKLE_TOOLS_PATH="/path/to/sparkle/bin"
./scripts/build-and-release.sh

# Option 3: Update sparkle.env manually
# Edit scripts/sparkle.env and set SPARKLE_BIN path
```

### Appcast Generation Fails

Usually caused by invalid .zip files:

```bash
# Verify zip integrity
unzip -t releases/Snapback-*.zip

# Check releases directory
ls -lh releases/

# Run generate-appcast with verbose error
./scripts/generate-appcast.sh
```

### Git Issues

If git operations fail:

```bash
# Skip git operations
./scripts/build-and-release.sh --skip-git

# Then commit manually
cd /Users/ricka7x/Projects/snapback-web
git add releases/
git commit -m "chore(release): Snapback v1.0.0"
git push
```

## Directory Structure

```
snapback-web/
├── releases/
│   ├── Snapback-1.0.0.zip      # Release archive
│   ├── Snapback-1.0.0.html     # Release notes
│   └── appcast.xml             # Sparkle feed (auto-generated)
├── scripts/
│   ├── build-and-release.sh    # Main pipeline (use this)
│   ├── release.sh              # Add release to repo
│   ├── generate-appcast.sh     # Generate feed
│   ├── config.sh               # Configuration
│   └── sparkle.env             # Sparkle path detection
├── .github/workflows/
│   └── generate-appcast.yml    # CI/CD automation
├── .gitignore                  # Excludes build artifacts
└── DEPLOYMENT.md               # This file
```

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review `build.log` for detailed error messages
3. Run with `--verbose` for detailed output
4. Check GitHub Actions logs for CI/CD issues

## Best Practices

- ✅ Always test locally with `--dry-run` first
- ✅ Review `git diff` before pushing
- ✅ Keep release notes up to date
- ✅ Test updates with local server before production
- ✅ Tag releases in git for easy reference
- ✅ Monitor GitHub Actions for automation failures

## Next Steps

1. Build and test locally: `./scripts/build-and-release.sh --dry-run`
2. Create a test release: `./scripts/build-and-release.sh --skip-git`
3. Push to production when ready
4. Monitor app update checks in the wild
