#!/usr/bin/env bash
#
# upscale_hero.sh — re-encode a hero JPEG at max quality, then Lanczos-resample
# to 3840px wide for HiDPI/Retina sharpness. macOS-only (uses sips).
#
# Usage:
#   bash upscale_hero.sh <path-to-jpg> [target-width]
#
# Defaults:
#   target-width = 3840
#
# Notes:
#   - Overwrites the input file in place.
#   - sips is ~equivalent to a high-quality Lanczos resize. It is NOT a true
#     generative AI upscaler; output is as sharp as the source allows.

set -euo pipefail

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" || $# -lt 1 ]]; then
  sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
fi

src="$1"
width="${2:-3840}"

if [[ ! -f "$src" ]]; then
  echo "upscale_hero.sh: file not found: $src" >&2
  exit 1
fi

if ! command -v sips >/dev/null 2>&1; then
  echo "upscale_hero.sh: sips not found (macOS-only tool)." >&2
  exit 1
fi

tmp="${src%.*}.tmp.jpg"

sips -s format jpeg -s formatOptions best "$src" --out "$tmp" >/dev/null
sips --resampleWidth "$width" "$tmp" --out "$src" >/dev/null
rm -f "$tmp"

echo "Upscaled $src to ${width}px wide (max-quality JPEG)."
