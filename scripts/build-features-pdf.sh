#!/usr/bin/env bash
# Render docs/sahai-features.html to PDF for upload to the Bedrock knowledge base.
# Uses whichever Chromium browser is already installed — no dependency to add.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC="$PWD/docs/sahai-features.html"
OUT="$PWD/docs/sahai-features.pdf"

for candidate in \
  "/c/Program Files/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Google/Chrome/Application/chrome.exe" \
  "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
  "$(command -v google-chrome || true)" \
  "$(command -v chromium || true)"; do
  if [ -n "$candidate" ] && [ -x "$candidate" ]; then
    BROWSER="$candidate"
    break
  fi
done

if [ -z "${BROWSER:-}" ]; then
  echo "No Chrome/Chromium/Edge found — install one, or open $SRC and print to PDF by hand." >&2
  exit 1
fi

# Windows browsers need a Windows-style path even when invoked from Git Bash.
if command -v cygpath >/dev/null 2>&1; then
  SRC_ARG="file:///$(cygpath -w "$SRC" | tr '\\' '/')"
  OUT_ARG="$(cygpath -w "$OUT")"
else
  SRC_ARG="file://$SRC"
  OUT_ARG="$OUT"
fi

"$BROWSER" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$OUT_ARG" "$SRC_ARG"

echo "Wrote $OUT"
