#!/usr/bin/env python3
"""Remove a flat/gradient background from an image via border-connected flood
fill, then defringe edges. Usage: python3 remove_bg.py <src> [dst]"""
import sys
from collections import deque
from PIL import Image

SRC = sys.argv[1] if len(sys.argv) > 1 else "public/rudraksha.png"
DST = sys.argv[2] if len(sys.argv) > 2 else SRC

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()

def is_bg(r, g, b):
    # Teal/green background: green clearly dominant over red.
    return g > r + 14 and g > 55 and (g - b) > -8 and r < g

seen = [[False] * w for _ in range(h)]
q = deque()

def try_seed(x, y):
    r, g, b, _ = px[x, y]
    if is_bg(r, g, b) and not seen[y][x]:
        seen[y][x] = True
        q.append((x, y))

for x in range(w):
    try_seed(x, 0)
    try_seed(x, h - 1)
for y in range(h):
    try_seed(0, y)
    try_seed(w - 1, y)

removed = 0
while q:
    x, y = q.popleft()
    r, g, b, a = px[x, y]
    px[x, y] = (r, g, b, 0)
    removed += 1
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx]:
            nr, ng, nb, _ = px[nx, ny]
            if is_bg(nr, ng, nb):
                seen[ny][nx] = True
                q.append((nx, ny))

# Feather + defringe: soft alpha on edge pixels, color pulled from nearest
# opaque neighbor to kill any background halo.
img2 = Image.new("RGBA", (w, h))
p2 = img2.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a == 0:
            neigh = 0
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] > 0:
                    neigh += 1
            if neigh:
                best = None
                bestd = 4
                for dx in (-1, 0, 1):
                    for dy in (-1, 0, 1):
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 255:
                            d = abs(dx) + abs(dy)
                            if d < bestd:
                                bestd = d
                                best = px[nx, ny][:3]
                if best:
                    p2[x, y] = (*best, 150)
        else:
            p2[x, y] = (r, g, b, a)

img2.save(DST)
print(f"removed {removed} px of {w * h} ({100 * removed / (w * h):.0f}%)")