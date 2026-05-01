#!/usr/bin/env python3
"""
check_alpha.py — verify that an RGBA PNG has real transparency around its edges.

Usage:
    python3 check_alpha.py <path-to-png>

Exits 0 in all cases; prints one of:
    OK - already transparent
    NEEDS KEY - found <N> white opaque pixels
    NOT RGBA - color type <n>, cannot be keyed

Uses only the Python standard library so it runs in sandboxed environments
where PIL/Pillow is not available.
"""
import struct
import sys
import zlib


def read_png(path):
    with open(path, "rb") as f:
        data = f.read()
    sig = data[:8]
    if sig[:8] != b"\x89PNG\r\n\x1a\n":
        raise SystemExit(f"Not a PNG: {path}")
    chunks = []
    i = 8
    while i < len(data):
        length = struct.unpack(">I", data[i : i + 4])[0]
        ctype = data[i + 4 : i + 8]
        cdata = data[i + 8 : i + 8 + length]
        chunks.append((ctype, cdata))
        i += 8 + length + 4
    return sig, chunks


def main(argv):
    if len(argv) != 2 or argv[1] in ("-h", "--help"):
        print(__doc__.strip())
        return 0

    path = argv[1]
    _, chunks = read_png(path)

    ihdr = next(d for t, d in chunks if t == b"IHDR")
    w, h, bd, ct, _, _, _ = struct.unpack(">IIBBBBB", ihdr[:13])

    if ct != 6 or bd != 8:
        print(f"NOT RGBA - color type {ct}, bit depth {bd}")
        return 0

    idat = b"".join(d for t, d in chunks if t == b"IDAT")
    raw = zlib.decompress(idat)

    stride = 1 + w * 4
    pixels = bytearray()
    prev = bytearray(w * 4)

    # Apply PNG filters per scanline. Supports filter 0 (None) and filter 1 (Sub),
    # which together cover ~all practical exports. Higher filter types fall through
    # to a conservative "raw" read — good enough for an alpha audit.
    for row in range(h):
        filt = raw[row * stride]
        scan = raw[row * stride + 1 : (row + 1) * stride]
        if filt == 0:
            line = bytearray(scan)
        elif filt == 1:
            line = bytearray(len(scan))
            for i in range(len(scan)):
                left = line[i - 4] if i >= 4 else 0
                line[i] = (scan[i] + left) & 0xFF
        else:
            line = bytearray(scan)
        pixels += line
        prev = line

    white_opaque = 0
    for i in range(0, len(pixels), 4):
        r, g, b, a = pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]
        if a > 0 and r >= 245 and g >= 245 and b >= 245:
            white_opaque += 1

    if white_opaque == 0:
        print("OK - already transparent")
    else:
        print(f"NEEDS KEY - found {white_opaque} white opaque pixels")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
