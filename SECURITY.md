# Security Guidelines

This document outlines security best practices for the Snapback release automation system.

## Summary

- ✅ **Public URLs are safe to commit** (snapbackapp.com)
- ❌ **Never commit secrets** (API keys, signing keys, credentials)
- 🔒 **Use environment variables** for sensitive configuration
- 📝 **Keep `.env.local` in `.gitignore`**
- 🔐 **GitHub Actions use Secrets** for CI/CD

## What's Safe to Commit

### ✅ Public Configuration

These are safe to include in `scripts/config.sh` or documentation:

- Public website URLs
  - `https://snapbackapp.com`
  - `https://snapbackapp.com/releases`
  
- Project paths and structure
  - `/Users/ricka7x/XcodeProjects/Snapback`
  - `Snapback/Info.plist`
  
- Build configuration
  - Xcode scheme names (`Snapback`)
  - Build configuration (`Release`)
  - macOS deployment target (`12.4`)

- Sparkle framework settings
  - AppCast URL patterns
  - Delta update configuration
  - Framework location paths

## What's Sensitive

### ❌ Never Commit These

**No circumstances should these be in version control:**

| Secret Type | Examples | Why |
|------------|----------|-----|
| Signing Keys | EdDSA private keys, code signing certs | Compromise allows forging updates |
| API Keys | GitHub, Sentry, analytics tokens | Access to external services |
| Credentials | Passwords, usernames, auth tokens | Direct account compromise |
| Private URLs | Staging servers, internal CDNs | Expose infrastructure |
| Encryption Keys | Private keys of any kind | Encryption completely broken |
| Database Info | Connection strings, credentials | Direct database access |
| Personal Data | Email addresses (if private), phone numbers | Privacy violation |

## Environment Variables for Secrets

### Local Development

Use `.env.local` for local development:

```bash
# .env.local (NOT committed to git)
export SPARKLE_ED_KEY_FILE="$HOME/.sparkle/snapback_private.key"
export DOWNLOAD_URL_PREFIX="https://private-staging.example.com/releases"
```

Then source before running:

```bash
source .env.local
./scripts/build-and-release.sh
```

### CI/CD (GitHub Actions)

GitHub Actions has built-in secrets management:

1. **Go to repository Settings**
2. **Secrets → Repository secrets**
3. **New repository secret**
   ```
   Name: SPARKLE_ED_KEY_FILE
   Value: [base64-encoded or actual key content]
   ```

4. **Use in workflow** (`.github/workflows/generate-appcast.yml`):
   ```yaml
   - name: Generate appcast
     env:
      SPARKLE_ED_KEY_FILE: ${{ secrets.SPARKLE_ED_KEY_FILE }}
     run: ./scripts/build-and-release.sh
   ```

The secret is:
- ✅ Encrypted in GitHub
- ✅ Never visible in logs
- ✅ Only available to the workflow
- ✅ Not accessible to pull requests from forks

## File Permissions

### Sensitive Files

```bash
# Private key should be user-readable only
chmod 600 ~/.sparkle/snapback_private.key

# .env.local should not be world-readable
chmod 600 .env.local

# scripts/config.sh can be group/world-readable (it's public)
chmod 644 scripts/config.sh
```

### .gitignore

Verify sensitive files are ignored:

```bash
# View what's being ignored
git check-ignore .env.local
git check-ignore .sparkle/private.key

# Test before committing
git status --porcelain | grep -E "\.env\.|\.key|\.pem"
```

## EdDSA Signing Keys

### Generation (One-Time)

```bash
# Generate key pair (store securely!)
SPARKLE_PATH="/path/to/sparkle/bin"
$SPARKLE_PATH/generate_keys

# This creates:
# - sparkle_private.key (KEEP SECRET!)
# - sparkle_public.key (goes in Info.plist)
```

### Private Key Storage

Never leave on your machine unencrypted:

```bash
# Secure option 1: Mac Keychain
security add-generic-password -s "sparkle-key" -a "user" -w "$(cat ~/.sparkle/sparkle_private.key)"

# Secure option 2: Encrypted file
openssl enc -aes-256-cbc -in ~/.sparkle/sparkle_private.key -out ~/.sparkle/sparkle_private.key.enc

# Secure option 3: 1Password/LastPass
# Store the key content in your password manager
```

### Public Key in Info.plist

The public key IS safe to commit:

```xml
<key>SUPublicEDKey</key>
<string>1btXa+HGNXBso5RoX1qjX2lltfdpXbryUma3dw6+/O4=</string>
```

This is **not a secret** - it authenticates signatures, doesn't create them.

## Audit Trail

### Check Committed Secrets

```bash
# Search git history for common secret patterns
git log -p --all -S "private_key" -- "*.sh"
git log -p --all -S "api_key" -- "*.sh"
git log -p --all -S "password" -- "*.sh"

# If found, remove from history:
git filter-branch --tree-filter 'rm -f .env.local' HEAD
```

### Review Sensitive Files

```bash
# What files touch sensitive data?
grep -r "SPARKLE_ED_KEY\|ED_KEY_FILE" scripts/

# Should only be in:
# - .env.local (not committed)
# - CI/CD workflows (using Secrets)
# - Documentation (guidelines only)
```

## Secrets Rotation

If a secret is compromised:

1. **Revoke immediately**
   - Generate new signing keys
   - Update CI/CD secrets

2. **Update all releases**
   - Re-sign using new key
   - Update appcast.xml
   - Test thoroughly

3. **Verify no leaks**
   - Check git history
   - Check logs
   - Check any backups

## Logging

### Safe Logging

The scripts log to `build.log`, which is:
- ✅ Store locally only
- ✅ Can contain build paths, version info
- ✅ Test logs before committing to git

*Never log:*
- API keys or tokens
- Private signing keys
- User credentials

### GitHub Actions Logs

Actions logs are private to the repository but:

```yaml
# ❌ Never do this
- run: echo ${{ secrets.MY_KEY }}  # Will be masked but visible in history

# ✅ Good practice
- name: Use secret
  env:
    MY_SECRET: ${{ secrets.MY_KEY }}
  run: ./script.sh  # Secrets passed as env vars, not echoed
```

## Compliance Checklist

Before committing:

- [ ] No API keys in any files
- [ ] No private signing keys in git
- [ ] No passwords or credentials
- [ ] `.env.local` is in `.gitignore`
- [ ] `.gitignore` blocks `*.key` and `*.pem` files
- [ ] Public URLs are safe (appcast, website)
- [ ] Scripts don't echo sensitive environment variables
- [ ] CI/CD uses GitHub Secrets, not hardcoded values
- [ ] `.env.local.example` shows structure only (no real secrets)
- [ ] EdDSA public key only (private key stored separately)

## References

- [GitHub Secrets Best Practices](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Sparkle Security](https://sparkle-project.org/documentation/security/)
- [OWASP Secrets Management](https://owasp.org/www-community/Sensitive_Data_Exposure)

## Questions

If you're unsure whether something is safe to commit:

1. **Would I want a competitor to know this?** → Don't commit it
2. **Does this provide access to systems?** → Don't commit it
3. **Is this unique to my setup?** → Consider using `.env.local`
4. **Is this public-facing?** → Safe to commit

When in doubt, use an environment variable!
