# Sparkle Update Distribution

This repository hosts the Sparkle appcast feed for distributing Snapback macOS app updates.

**Live URL:** https://snapbackapp.com/appcast.xml

## Structure

```
.
├── releases/              # Release archives and metadata
│   ├── Snapback-1.0.0.zip    # Application archive
│   ├── Snapback-1.0.0.html   # Release notes (optional)
│   └── appcast.xml           # Generated feed (auto-generated)
├── scripts/
│   ├── sparkle.env           # Sparkle path configuration
│   ├── generate-appcast.sh   # Generate appcast using Sparkle
│   └── release.sh            # Helper to add releases
└── .github/workflows/
    └── generate-appcast.yml  # Auto-generate appcast on push
```

## Quick Start

### 1. Add a New Release

```bash
# Basic: just the app
./scripts/release.sh ./build/Snapback-1.0.0.zip

# With release notes
./scripts/release.sh ./build/Snapback-1.0.0.zip \
  --release-notes ./release-notes/1.0.0.html

# With EdDSA signing key
./scripts/release.sh ./build/Snapback-1.0.0.zip \
  --ed-key-file ~/.sparkle/private.key
```

### 2. Manual Appcast Generation

```bash
./scripts/generate-appcast.sh
```

This runs Sparkle's native `generate_appcast` tool which:

- Scans `releases/` for `.zip` files
- Pairs them with optional `.html`/`.txt` release notes
- Generates `appcast.xml` with proper Sparkle metadata
- Creates delta updates (for incremental downloads)
- Manages version history

## Release Notes Format

For each release, you can optionally include release notes:

**HTML Format** (`Snapback-1.0.0.html`):
```html
<h2>What's New in 1.0.0</h2>
<ul>
  <li>Feature 1</li>
  <li>Bug fix</li>
</ul>
```

**Text Format** (`Snapback-1.0.0.txt`):
```
Version 1.0.0

- Feature 1
- Bug fix
```

## Configure Sparkle Path

The scripts use Sparkle's native `generate_appcast` binary. Update the path in `scripts/sparkle.env`:

```bash
# Typical location after building with Sparkle framework:
SPARKLE_BIN="/Users/ricka7x/Library/Developer/Xcode/DerivedData/Snapback-[ID]/SourcePackages/artifacts/sparkle/Sparkle/bin"
```

Or set the environment variable:
```bash
export SPARKLE_TOOLS_PATH="/path/to/sparkle/bin"
./scripts/release.sh Snapback-1.0.0.zip
```

## Automation

The GitHub Actions workflow (`.github/workflows/generate-appcast.yml`) automatically:

1. Detects when new files are pushed to `releases/`
2. Runs `generate_appcast`
3. Commits the updated `appcast.xml`
4. Pushes back to the repository

This keeps your appcast feed in sync with your releases.

## Using in Your Mac App

In your Snapback app, configure Sparkle with:

```swift
SUUpdater.shared().feedURL = URL(string: "https://snapbackapp.com/appcast.xml")
```

## Sparkle Documentation

- [Publishing Updates](https://sparkle-project.org/documentation/publishing/)
- [Appcast Format](https://sparkle-project.org/documentation/appcast-format/)
- [Release Notes](https://sparkle-project.org/documentation/release-notes/)

## File Structure in Releases

Generated structure after running appcast generation:

```
releases/
├── Snapback-1.0.0.zip
├── Snapback-1.0.0.html
├── Snapback-1.1.0.zip
├── Snapback-1.1.0.txt
├── appcast.xml
└── old_updates/
    └── (old releases automatically moved here)
```
