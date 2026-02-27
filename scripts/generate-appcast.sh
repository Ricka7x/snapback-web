#!/bin/bash
#
# generate-appcast.sh - Generate appcast.xml using Sparkle's native tool
#
# Usage:
#   ./scripts/generate-appcast.sh [options]
#
# Release files should be named: Snapback-X.Y.Z.zip
# Release notes should be named: Snapback-X.Y.Z.html or Snapback-X.Y.Z.txt
#

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( dirname "$SCRIPT_DIR" )"
RELEASES_DIR="$PROJECT_DIR/releases"

# Source Sparkle path configuration
source "$SCRIPT_DIR/sparkle.env"

# Check if generate_appcast exists
if [ ! -f "$SPARKLE_BIN/generate_appcast" ]; then
  echo "❌ Error: Sparkle's generate_appcast not found at:"
  echo "   $SPARKLE_BIN/generate_appcast"
  echo ""
  echo "Please update SPARKLE_BIN in scripts/sparkle.env with the correct path."
  echo "Usually found in: ~/Library/Developer/Xcode/DerivedData/[YourApp]/SourcePackages/artifacts/sparkle/Sparkle/bin"
  exit 1
fi

# Create releases directory if it doesn't exist
mkdir -p "$RELEASES_DIR"

# Parse options
DOWNLOAD_URL_PREFIX="https://snapbackapp.com/releases"
LINK="https://snapbackapp.com"
ED_KEY_FILE=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --download-url-prefix)
      DOWNLOAD_URL_PREFIX="$2"
      shift 2
      ;;
    --ed-key-file)
      ED_KEY_FILE="$2"
      shift 2
      ;;
    --help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  --download-url-prefix URL   Download URL prefix (default: https://snapbackapp.com/releases)"
      echo "  --ed-key-file PATH          Path to EdDSA private key file"
      echo "  --help                      Show this help"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done

echo "🔨 Generating appcast using Sparkle..."

# Build command
CMD="$SPARKLE_BIN/generate_appcast"
CMD="$CMD --download-url-prefix $DOWNLOAD_URL_PREFIX"
CMD="$CMD --link $LINK"

if [ -n "$ED_KEY_FILE" ]; then
  CMD="$CMD --ed-key-file $ED_KEY_FILE"
fi

CMD="$CMD $RELEASES_DIR"

# Run generate_appcast
$CMD

echo "✅ Appcast generated at: $RELEASES_DIR/appcast.xml"
