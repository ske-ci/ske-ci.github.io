#!/usr/bin/env bash

set -Eeuo pipefail
shopt -s nullglob

SOURCE="public/favicon.svg"
OUTPUT="public/images/icons"

# Run from the repository root.
if [[ ! -f package.json ]]; then
    printf '❌ package.json not found. Run this script from the project root.\n' >&2
    exit 1
fi

# Ensure the local CLI is available through PNPM.
if ! pnpm exec pwa-asset-generator --help >/dev/null 2>&1; then
    printf '❌ pwa-asset-generator is unavailable. Install it as a project dev dependency first.\n' >&2
    exit 1
fi

# Check the source icon.
if [[ ! -f "$SOURCE" ]]; then
    printf '❌ Source icon not found: %s\n' "$SOURCE" >&2
    exit 1
fi

printf '🔍 Checking project configuration...\n'

mkdir -p "$OUTPUT"

# Generate application icons and the favicon.
printf '⚙️ Generating application icons and favicon...\n'

pnpm exec pwa-asset-generator \
    "$SOURCE" "$OUTPUT" \
    --opaque false \
    --icon-only \
    --favicon \
    --type png

# Generate the remaining PWA assets.
printf '⚙️ Generating remaining PWA assets...\n'

pnpm exec pwa-asset-generator \
    "$SOURCE" "$OUTPUT" \
    --opaque false \
    --type png

# Normalize generated filenames.
printf '⚙️ Normalizing generated filenames...\n'

cd "$OUTPUT"

# Rename Apple touch icons.
for file in apple-icon-*.png; do
    [[ -f "$file" ]] || continue

    if [[ "$file" =~ ^apple-icon-([0-9]+)\.png$ ]]; then
        mv -- "$file" "icon-${BASH_REMATCH[1]}.png"
    fi
done

# Rename maskable manifest icons.
for file in manifest-icon-*.maskable.png; do
    [[ -f "$file" ]] || continue

    if [[ "$file" =~ ^manifest-icon-([0-9]+)\.maskable\.png$ ]]; then
        mv -- "$file" "icon-${BASH_REMATCH[1]}.png"
    fi
done

# Rename Apple splash screens.
for file in apple-splash-*.png; do
    [[ -f "$file" ]] || continue

    if [[ "$file" =~ ^apple-splash-([0-9]+)-([0-9]+)\.png$ ]]; then
        mv -- "$file" "splash-${BASH_REMATCH[1]}x${BASH_REMATCH[2]}.png"
    fi
done

printf '\n✅ Icon generation completed successfully.\n'
printf '📦 Generated PNG assets:\n'

find . -maxdepth 1 -type f -name '*.png' -print |
    sed 's|^\./||' |
    sort

printf '\n🎉 All done!\n'