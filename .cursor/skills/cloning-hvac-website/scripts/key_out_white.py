#!/usr/bin/env python3
"""
key_out_white.py — rewrite a PNG in place, turning every white-ish opaque pixel
into a fully transparent pixel. Intended for logo-white.png assets that ship
with an alpha channel but an opaque white background.

Usage:
    python3 key_out_white.py <path-to-png> [--threshold N]

Arguments:
    path         Path to an RGBA 8-bit PNG. File is overwritten.
    --threshold  Minimum R/G/B value to treat as "white". Default 245.

The script uses only the Python standard library (struct, zlib) so it runs in
sandboxed environments without PIL/Pillow.
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


def write_png(path, sig, chunks):
    with open(path, "wb") as f:
        f.write(sig)
        for ctype, cdata in chunks:
            f.write(struct.pack(">I", len(cdata)))
            f.write(ctype)
            f.write(cdata)
            f.write(struct.pack(">I", zlib.crc32(ctype + cdata) & 0xFFFFFFFF))


def unfilter(raw, w, h):
    stride = 1 + w * 4
    pixels = bytearray()
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
    return pixels


def main(argv):
    if len(argv) < 2 or argv[1] in ("-h", "--help"):
        print(__doc__.strip())
        return 0

    path = argv[1]
    threshold = 245
    if "--threshold" in argv:
        threshold = int(argv[argv.index("--threshold") + 1])

    sig, chunks = read_png(path)
    ihdr = next(d for t, d in chunks if t == b"IHDR")
    w, h, bd, ct, _, _, _ = struct.unpack(">IIBBBBB", ihdr[:13])
    if ct != 6 or bd != 8:
        raise SystemExit(f"Expected RGBA8 (ct=6, bd=8). Got ct={ct}, bd={bd}.")

    idat = b"".join(d for t, d in chunks if t == b"IDAT")
    raw = zlib.decompress(idat)
    pixels = unfilter(raw, w, h)

    keyed = 0
    for i in range(0, len(pixels), 4):
        r, g, b, a = pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]
        if a > 0 and r >= threshold and g >= threshold and b >= threshold:
            pixels[i + 3] = 0
            keyed += 1

    # Re-encode with filter 0 per row.
    enc = bytearray()
    for row in range(h):
        enc.append(0)
        enc += pixels[row * w * 4 : (row + 1) * w * 4]
    comp = zlib.compress(bytes(enc), 9)

    new_chunks = []
    placed = False
    for ctype, cdata in chunks:
        if ctype == b"IDAT":
            if not placed:
                new_chunks.append((b"IDAT", comp))
                placed = True
            continue
        new_chunks.append((ctype, cdata))

    write_png(path, sig, new_chunks)
    print(f"Keyed {keyed} white pixels to transparent in {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
