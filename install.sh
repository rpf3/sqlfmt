#!/usr/bin/env sh
# install.sh — download and install a sqlfmt release binary
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/rpf3/sqlfmt/main/install.sh | sh
#
# Environment variables:
#   SQLFMT_VERSION  — release tag to install (default: latest), e.g. v1.0.0
#   INSTALL_DIR     — install directory (default: ~/.local/bin)
#
# Examples:
#   SQLFMT_VERSION=v1.0.0 sh install.sh
#   INSTALL_DIR=/usr/local/bin sh install.sh

set -e

REPO="rpf3/sqlfmt"
INSTALL_DIR="${INSTALL_DIR:-$HOME/.local/bin}"

# ── detect OS ────────────────────────────────────────────────────────────────

OS="$(uname -s)"
case "$OS" in
  Linux)   OS="linux" ;;
  Darwin)  OS="darwin" ;;
  *)
    echo "error: unsupported operating system: $OS" >&2
    exit 1
    ;;
esac

# ── detect arch ──────────────────────────────────────────────────────────────

ARCH="$(uname -m)"
case "$ARCH" in
  x86_64)          ARCH="amd64" ;;
  arm64 | aarch64) ARCH="arm64" ;;
  *)
    echo "error: unsupported architecture: $ARCH" >&2
    exit 1
    ;;
esac

# ── detect sha256 tool ───────────────────────────────────────────────────────

if command -v sha256sum >/dev/null 2>&1; then
  SHA256="sha256sum"
elif command -v shasum >/dev/null 2>&1; then
  SHA256="shasum -a 256"
else
  echo "error: neither sha256sum nor shasum found; cannot verify download" >&2
  exit 1
fi

# ── resolve version ──────────────────────────────────────────────────────────

if [ -n "${SQLFMT_VERSION:-}" ]; then
  VERSION="$SQLFMT_VERSION"
  echo "Using requested version: $VERSION"
else
  echo "Fetching latest release..."
  VERSION="$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" \
    | grep '"tag_name"' \
    | sed 's/.*"tag_name": *"\(.*\)".*/\1/')"

  if [ -z "$VERSION" ]; then
    echo "error: could not determine latest release version" >&2
    exit 1
  fi

  echo "Latest version: $VERSION"
fi

# ── construct URLs ───────────────────────────────────────────────────────────

# Strip leading 'v' for filenames (GoReleaser uses bare version, not tag).
VER="${VERSION#v}"

BASE_URL="https://github.com/${REPO}/releases/download/${VERSION}"
ARCHIVE="sqlfmt_${VER}_${OS}_${ARCH}.tar.gz"
CHECKSUMS="checksums.txt"

# ── download ─────────────────────────────────────────────────────────────────

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

echo "Downloading ${ARCHIVE}..."
curl -fsSL "${BASE_URL}/${ARCHIVE}"   -o "${TMPDIR}/${ARCHIVE}"
curl -fsSL "${BASE_URL}/${CHECKSUMS}" -o "${TMPDIR}/${CHECKSUMS}"

# ── verify checksum ──────────────────────────────────────────────────────────

echo "Verifying checksum..."
cd "$TMPDIR"
# checksums.txt contains lines like: <hash>  <filename>
# grep out the line for our archive, then verify.
grep "${ARCHIVE}" "${CHECKSUMS}" | $SHA256 --check --status
cd - >/dev/null
echo "Checksum OK."

# ── extract and install ──────────────────────────────────────────────────────

echo "Installing to ${INSTALL_DIR}/sqlfmt..."
mkdir -p "$INSTALL_DIR"
tar -xzf "${TMPDIR}/${ARCHIVE}" -C "$TMPDIR" sqlfmt
mv "${TMPDIR}/sqlfmt" "${INSTALL_DIR}/sqlfmt"
chmod +x "${INSTALL_DIR}/sqlfmt"

echo "Installed ${INSTALL_DIR}/sqlfmt $(${INSTALL_DIR}/sqlfmt --version 2>/dev/null || true)"

# ── PATH hint ────────────────────────────────────────────────────────────────

case ":${PATH}:" in
  *":${INSTALL_DIR}:"*) ;;
  *)
    echo ""
    echo "Note: ${INSTALL_DIR} is not on your PATH."
    echo "Add the following line to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
    echo ""
    echo "  export PATH=\"\$PATH:${INSTALL_DIR}\""
    echo ""
    ;;
esac
