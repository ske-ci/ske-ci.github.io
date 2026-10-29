#!/usr/bin/env bash

set -Eeuo pipefail
shopt -s nullglob

# Run from the repository root.
if [[ ! -f package.json ]]; then
    printf 'Error: package.json not found. Run this script from the project root.\n' >&2
    exit 1
fi

# Ensure the local CLI is available through PNPM.
if ! pnpm exec pwa-asset-generator --help >/dev/null 2>&1; then
    printf 'Error: pwa-asset-generator is unavailable. Install it as a project dev dependency first.\n' >&2
    exit 1
fi

SOURCE="public/favicon.svg"
OUTPUT="public/images/icons"

if [[ ! -f "$SOURCE" ]]; then
    printf 'Error: source icon not found: %s\n' "$SOURCE" >&2
    exit 1
fi

mkdir -p "$OUTPUT"

# Generate application icons and the favicon.
pnpm exec pwa-asset-generator \
    "$SOURCE" "$OUTPUT" \
    --opaque false \
    --icon-only \
    --favicon \
    --type png

# Generate the remaining PWA assets.
pnpm exec pwa-asset-generator \
    "$SOURCE" "$OUTPUT" \
    --opaque false \
    --type png

# Normalize generated filenames.
cd "$OUTPUT"

# Remove generated variants that are not part of the desired naming scheme.
rm -f favicon-* icon-* splash-*

for file in apple-icon-*.png; do
    [[ -f "$file" ]] || continue

    if [[ "$file" =~ ^apple-icon-([0-9]+)\.png$ ]]; then
        mv -- "$file" "icon-${BASH_REMATCH[1]}.png"
    fi
done

for file in manifest-icon-*.maskable.png; do
    [[ -f "$file" ]] || continue

    if [[ "$file" =~ ^manifest-icon-([0-9]+)\.maskable\.png$ ]]; then
        mv -- "$file" "icon-${BASH_REMATCH[1]}.png"
    fi
done

for file in apple-splash-*.png; do
    [[ -f "$file" ]] || continue

    if [[ "$file" =~ ^apple-splash-([0-9]+)-([0-9]+)\.png$ ]]; then
        mv -- "$file" "splash-${BASH_REMATCH[1]}x${BASH_REMATCH[2]}.png"
    fi
done

printf '\nGenerated icon assets:\n'
find . -maxdepth 1 -type f -name '*.png' -printf '%f\n' | sort