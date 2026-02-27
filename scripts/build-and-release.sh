#!/bin/bash
#
# build-and-release.sh - Complete automated build and release pipeline
#
# This script handles the entire process from source code to production release:
# 1. Validates environment and configuration
# 2. Extracts version from Info.plist
# 3. Builds and archives the Xcode project
# 4. Exports the app bundle
# 5. Creates a release zip
# 6. Generates the Sparkle appcast.xml
# 7. Commits changes to git
#
# Usage:
#   ./scripts/build-and-release.sh [options]
#
# Options:
#   --dry-run           Show what would be done without making changes
#   --skip-git          Don't commit or push to git
#   --release-notes FILE   Include release notes HTML/TXT file
#   --version VERSION   Override version detection
#   --verbose           Enable verbose output
#   --help              Show this help message
#

set -u

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( dirname "$SCRIPT_DIR" )"

# Source configuration
source "$SCRIPT_DIR/config.sh"

# ============================================================================
# DEFAULTS AND ARGUMENT PARSING
# ============================================================================

DRY_RUN=false
SKIP_GIT=false
RELEASE_NOTES_FILE=""
OVERRIDE_VERSION=""
VERBOSE=false

show_help() {
  sed -n '/^#/p' "$0" | sed 's/^# *//' | sed '/^$/d'
}

while [[ $# -gt 0 ]]; do
  case $1 in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-git)
      SKIP_GIT=true
      shift
      ;;
    --release-notes)
      RELEASE_NOTES_FILE="$2"
      shift 2
      ;;
    --version)
      OVERRIDE_VERSION="$2"
      shift 2
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    --help)
      show_help
      exit 0
      ;;
    *)
      log_error "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# ============================================================================
# INITIALIZATION
# ============================================================================

# Initialize log file
mkdir -p "$(dirname "$LOG_FILE")"
echo "=== Snapback Build & Release Started: $(date) ===" > "$LOG_FILE"

log_info "Starting Snapback build and release pipeline..."
log_info "Project directory: $PROJECT_DIR"
log_info "Xcode project: $XCODE_PROJECT_PATH"

# ============================================================================
# VALIDATION PHASE
# ============================================================================

log_info "Validating configuration..."

if ! validate_config; then
  log_error "Configuration validation failed"
  exit 1
fi

log_success "Configuration validated"

# ============================================================================
# VERSION DETECTION
# ============================================================================

log_info "Detecting version..."

if [ -n "$OVERRIDE_VERSION" ]; then
  VERSION="$OVERRIDE_VERSION"
  log_info "Using override version: $VERSION"
else
  # Extract version from Info.plist using PlistBuddy (more reliable than defaults)
  PLIST_PATH="$XCODE_PROJECT_PATH/$INFO_PLIST"
  
  if ! file_exists "$PLIST_PATH"; then
    log_error "Info.plist not found at: $PLIST_PATH"
    exit 1
  fi
  
  # Try to read CFBundleShortVersionString first, fallback to CFBundleVersion
  VERSION=$(/usr/libexec/PlistBuddy -c "Print :CFBundleShortVersionString" "$PLIST_PATH" 2>/dev/null || \
            /usr/libexec/PlistBuddy -c "Print :CFBundleVersion" "$PLIST_PATH")
  
  if [ -z "$VERSION" ]; then
    log_error "Could not extract version from Info.plist"
    exit 1
  fi
fi

log_success "Version detected: $VERSION"

# ============================================================================
# BUILD PHASE
# ============================================================================

log_info "Starting Xcode build..."

# Clean build directory
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

log_debug "Build directory: $BUILD_DIR"

# Archive the project
log_info "Creating archive..."
if [ "$DRY_RUN" = "true" ]; then
  log_warn "[DRY RUN] Would execute: xcodebuild archive -scheme \"$XCODE_SCHEME\" -archivePath \"$ARCHIVE_PATH\""
else
  if ! xcodebuild \
    -project "$XCODE_PROJECT_PATH/Snapback.xcodeproj" \
    -scheme "$XCODE_SCHEME" \
    -configuration "$XCODE_CONFIG" \
    archive \
    -archivePath "$ARCHIVE_PATH" \
    >> "$LOG_FILE" 2>&1; then
    log_error "Archive failed. Check log: $LOG_FILE"
    exit 1
  fi
  
  if ! dir_exists "$ARCHIVE_PATH"; then
    log_error "Archive path not created: $ARCHIVE_PATH"
    exit 1
  fi
  
  log_success "Archive created successfully"
fi

# ============================================================================
# EXPORT PHASE
# ============================================================================

log_info "Exporting app bundle..."

# Create export options plist
if [ "$DRY_RUN" != "true" ]; then
  cat > "$EXPORT_OPTIONS_PLIST" << 'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>mac-application</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>stripSwiftSymbols</key>
    <true/>
</dict>
</plist>
PLIST
  
  if ! xcodebuild \
    -exportArchive \
    -archivePath "$ARCHIVE_PATH" \
    -exportOptionsPlist "$EXPORT_OPTIONS_PLIST" \
    -exportPath "$EXPORT_PATH" \
    >> "$LOG_FILE" 2>&1; then
    log_error "Export failed. Check log: $LOG_FILE"
    exit 1
  fi
  
  log_success "App bundle exported successfully"
fi

# ============================================================================
# VALIDATION PHASE 2
# ============================================================================

log_info "Validating build artifacts..."

if [ "$DRY_RUN" != "true" ]; then
  for required_file in "${REQUIRED_FILES[@]}"; do
    if ! file_exists "$required_file" && ! dir_exists "$required_file"; then
      log_error "Required file not found: $required_file"
      exit 1
    fi
  done
  
  log_success "All required artifacts present"
fi

# ============================================================================
# PACKAGING PHASE
# ============================================================================

log_info "Creating release archive..."

RELEASE_NAME="Snapback-$VERSION"
RELEASE_ZIP="$BUILD_DIR/$RELEASE_NAME.zip"

if [ "$DRY_RUN" = "true" ]; then
  log_warn "[DRY RUN] Would zip: $EXPORT_PATH/Snapback.app -> $RELEASE_ZIP"
else
  if ! ditto -c -k --sequesterRsrc "$EXPORT_PATH/Snapback.app" "$RELEASE_ZIP"; then
    log_error "Failed to create zip archive"
    exit 1
  fi
  
  if ! file_exists "$RELEASE_ZIP"; then
    log_error "Zip file not created: $RELEASE_ZIP"
    exit 1
  fi
  
  RELEASE_SIZE=$(du -h "$RELEASE_ZIP" | cut -f1)
  log_success "Release archive created: $RELEASE_ZIP ($RELEASE_SIZE)"
fi

# ============================================================================
# RELEASE PHASE
# ============================================================================

log_info "Adding release to repository..."

RELEASE_SCRIPT="$SCRIPT_DIR/release.sh"

if [ ! -f "$RELEASE_SCRIPT" ]; then
  log_error "Release script not found: $RELEASE_SCRIPT"
  exit 1
fi

# Build release.sh arguments
RELEASE_ARGS=("$RELEASE_ZIP")

if [ -n "$RELEASE_NOTES_FILE" ]; then
  if ! file_exists "$RELEASE_NOTES_FILE"; then
    log_error "Release notes file not found: $RELEASE_NOTES_FILE"
    exit 1
  fi
  RELEASE_ARGS+=("--release-notes" "$RELEASE_NOTES_FILE")
fi

if [ "$DRY_RUN" = "true" ]; then
  log_warn "[DRY RUN] Would execute: bash $RELEASE_SCRIPT ${RELEASE_ARGS[@]}"
else
  if ! bash "$RELEASE_SCRIPT" "${RELEASE_ARGS[@]}"; then
    log_error "Failed to add release. Check output above."
    exit 1
  fi
fi

# ============================================================================
# GIT PHASE
# ============================================================================

if [ "$SKIP_GIT" = "false" ]; then
  log_info "Committing changes to git..."
  
  if [ "$DRY_RUN" = "true" ]; then
    log_warn "[DRY RUN] Would git add/commit release files"
  else
    cd "$PROJECT_DIR"
    
    # Check if git repo exists
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
      log_warn "Not a git repository, skipping git operations"
    else
      # Add release files
      git add "releases/$RELEASE_NAME.zip" 2>/dev/null || true
      git add "releases/Snapback-$VERSION."* 2>/dev/null || true
      git add "releases/appcast.xml" 2>/dev/null || true
      
      # Commit if there are changes
      if ! git diff --quiet --cached; then
        git commit -m "chore(release): Snapback v$VERSION

- App archive: $RELEASE_NAME.zip
- Appcast updated
- Built: $(date +'%Y-%m-%d %H:%M:%S')"
        
        log_success "Changes committed"
        
        # Optionally push (disabled by default, requires manual push)
        log_info "To push this release, run: cd $PROJECT_DIR && git push"
      else
        log_info "No changes to commit"
      fi
    fi
  fi
fi

# ============================================================================
# SUMMARY
# ============================================================================

log_success "Build and release pipeline completed!"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                    RELEASE SUMMARY                        ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║ Version:        $VERSION"
echo "║ Release Zip:    $RELEASE_ZIP"
echo "║ Website URL:    $WEBSITE_URL"
echo "║ Download URL:   $DOWNLOAD_URL_PREFIX/$RELEASE_NAME.zip"
if [ -f "$PROJECT_DIR/releases/appcast.xml" ]; then
  echo "║ Appcast:        $DOWNLOAD_URL_PREFIX/appcast.xml"
fi
echo "║ Build Log:      $LOG_FILE"
if [ "$DRY_RUN" = "true" ]; then
  echo "║                                                            ║"
  echo "║ ⚠️  DRY RUN MODE - No files were modified                  ║"
fi
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

if [ "$DRY_RUN" != "true" ] && [ "$SKIP_GIT" = "false" ]; then
  echo "📌 Next steps:"
  echo "   1. Review the changes: git log --oneline -1"
  echo "   2. Push to production: cd $PROJECT_DIR && git push"
  echo ""
fi

exit 0
