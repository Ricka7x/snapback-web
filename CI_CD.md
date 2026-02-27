# GitHub Actions CI/CD Automation

Automated Sparkle appcast generation and distribution.

## Overview

The GitHub Actions workflow automatically generates and publishes the Sparkle appcast feed whenever you push release artifacts to the repository.

**Workflow**: `.github/workflows/generate-appcast.yml`

## How It Works

### Trigger Events

The workflow runs when:

1. **Push to main branch** with changes to `releases/` folder
   - New `.zip` files (release archives)
   - New `.html` or `.txt` files (release notes)

2. **Manual trigger** via GitHub UI
   - Actions tab → Run workflow

### Execution Steps

```
┌─────────────────────────────────────────┐
│ 1. Checkout Repository                  │
│    (fetch all code with full history)   │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 2. Find Sparkle Binary                  │
│    (search with auto-detection)         │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 3. Generate Appcast                     │
│    (create feed from releases/)         │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 4. Check for Changes                    │
│    (diff against previous version)      │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 5. Commit & Push Appcast                │
│    (update repository automatically)    │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│ 6. Summary Report                       │
│    (GitHub Actions summary)             │
└─────────────────────────────────────────┘
```

## Configuration

The workflow is self-contained and requires no setup. It automatically:

- ✅ Finds the Sparkle binary
- ✅ Detects releases in the repository  
- ✅ Generates/updates appcast.xml
- ✅ Commits changes as `git bot`
- ✅ Reports summary to GitHub

### Customization

Edit `.github/workflows/generate-appcast.yml` to:

- Change trigger paths (line 8)
- Modify download URL (line 99)
- Adjust workflow name or scheduling

Example: Daily generation at 2 AM UTC

```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # Every day at 2 AM UTC
  workflow_dispatch:
```

## Monitoring

### View Workflow Runs

1. Go to GitHub repository
2. Click **Actions** tab
3. Select **Generate & Commit Appcast** workflow
4. View run history and logs

### Check Logs

Click any workflow run to see detailed output:

- ✅ Sparkle binary found location
- ✅ Releases scanned
- ✅ Appcast generation status
- ✅ Changes committed
- ✅ Summary report

### Troubleshooting in Actions

Look for these common issues in logs:

**❌ Sparkle binary not found**
```
⚠️  Sparkle binary not found in default locations
```
→ Install Sparkle or update workflow paths

**❌ No releases detected**
```
⚠️  No release archives found
```
→ Ensure `.zip` files exist in releases/

**❌ Appcast generation failed**
```
❌ Error: appcast.xml not created
```
→ Verify `.zip` file integrity: `unzip -t releases/Snapback-*.zip`

## Manual Workflow Trigger

### Via GitHub CLI

```bash
gh workflow run generate-appcast.yml -R Ricka7x/snapback-web
```

### Via GitHub Web UI

1. Go to Actions → Workflows
2. Select "Generate & Commit Appcast"
3. Click "Run workflow" → "Run workflow"

## Parallelization & Concurrency

The workflow uses concurrency control:

```yaml
concurrency:
  group: appcast
  cancel-in-progress: false
```

This ensures:
- ✅ Only one workflow runs at a time
- ✅ Prevents race conditions
- ✅ Maintains data integrity

If a new push occurs while a workflow is running, it waits for completion before starting.

## Permissions

The workflow needs write access to repository:

```yaml
permissions:
  contents: write
```

This allows the `github-actions[bot]` user to:
- Commit files
- Push changes
- Update appcast.xml

## Security

The workflow is secure:

- ✅ Uses official GitHub actions
- ✅ Runs as `github-actions[bot]` (restricted bot account)
- ✅ Only writes to `releases/` folder
- ✅ No external dependencies
- ✅ Commits are traceable

### Commit Metadata

Automated commits show:
- Author: `github-actions[bot]`
- Account: GitHub official bot
- Message: Includes version info
- Timestamp: Automatic

## Performance

**Average execution time**: 2-5 minutes

Breakdown:
- Checkout: ~10s
- Find Sparkle: ~5s
- Generate appcast: ~30s
- Commit & push: ~10s
- Summary: ~5s

## Integration with Development

### Local Development Workflow

1. **Locally**: Run `./scripts/build-and-release.sh`
2. **Pushes**: Release files to GitHub
3. **Actions**: Automatically generates appcast
4. **Result**: Updated feed deployed

### Production Workflow

```
Dev Push → GitHub → Actions Trigger → Appcast Generated → Feed Updated
```

## Example: Adding a Release

1. **Build locally**
   ```bash
   ./scripts/build-and-release.sh --skip-git
   ```

2. **Verify locally**
   ```bash
   git status  # Check releases/ folder
   ```

3. **Push to GitHub**
   ```bash
   cd /Users/ricka7x/Projects/snapback-web
   git add releases/Snapback-*.zip
   git commit -m "feat: release Snapback v1.0.0"
   git push origin main
   ```

4. **Watch it happen** (GitHub Actions dashboard)
   - Workflow triggers automatically
   - Appcast.xml is generated
   - Changes are committed
   - Feed is live in ~3 minutes

## Health Checks

Verify the workflow is working:

### Check appcast.xml Exists

```bash
# Via GitHub web
# Go to snapback-web → releases/appcast.xml

# Via curl
curl https://snapbackapp.com/appcast.xml | head -20
```

### Check Recent Commits

```bash
git log --oneline releases/ | head -10
```

Should show recent commits from `github-actions[bot]`.

### Monitor for Errors

Set up GitHub notifications:

1. Go to repository settings
2. Configure notifications
3. Watch for workflow failures

## Failure Recovery

If a workflow fails:

1. **Check logs** (Actions tab)
2. **Fix the issue** (usually Sparkle path or invalid zip)
3. **Retry manually**:
   - Go to Actions
   - Click the failed workflow
   - Click "Re-run jobs"

## Scheduled Runs

To run appcast generation on a schedule (e.g., daily):

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
  workflow_dispatch:
```

## Disabling Automation

To temporarily disable the workflow:

1. Go to Actions → Workflows
2. Click "Generate & Commit Appcast"
3. Click ... menu → "Disable workflow"

Then re-enable when ready.

## Notifications

Configure GitHub notifications for workflow status:

- Failed workflows
- Workflow completion
- Deployment notifications

Go to your GitHub Settings → Notifications.

## Further Reading

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Sparkle Documentation](https://sparkle-project.org/)
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Local release guide
- [scripts/README.md](./scripts/README.md) - Script documentation
