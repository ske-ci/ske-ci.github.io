#!/usr/bin/env bash

deno x pwa-asset-generator public/favicon.svg public/images/icons --opaque false --icon-only --favicon --type png
deno x pwa-asset-generator public/favicon.svg public/images/icons --opaque false --type png

cd public/images/icons || exit 1

rm -f favicon-* icon-* splash-*

for file in apple-icon-*.png
do
    size=$(echo "$file"|sed -E 's/apple-icon-([0-9]+).png/\1/')
    mv "$file" "icon-${size}.png"
done

for file in manifest-icon-*.maskable.png
do
    size=$(echo "$file"|sed -E 's/manifest-icon-([0-9]+).maskable.png/\1/')
    mv "$file" "icon-${size}.png"
done

for file in apple-splash-*.png
do
    dims=$(echo "$file"|sed -E 's/apple-splash-([0-9]+)-([0-9]+).png/\1x\2/')
    mv "$file" "splash-${dims}.png"
done

ls
