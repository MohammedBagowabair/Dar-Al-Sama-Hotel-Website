"""Regenerate responsive images in public/img from assets-src (Pillow with WebP/AVIF)."""
from PIL import Image
SRC, OUT = "assets-src", "public/img"
def fit(im, w):
    W, H = im.size
    return im.resize((w, round(H * w / W)), Image.LANCZOS)
for name in ["city", "coffee", "detail", "dining", "majlis", "spa", "suite", "hero"]:
    im = Image.open(f"{SRC}/{name}.jpg").convert("RGB")
    for w in [480, 800, 1200]:
        if w > im.size[0]: w = im.size[0]
        fit(im, w).save(f"{OUT}/{name}-{w}.webp", "WEBP", quality=70, method=6)
# Hero inside the qamariya arch: 4:5 portrait centre crop.
hero = Image.open(f"{SRC}/hero.jpg").convert("RGB"); W, H = hero.size
cw = round(H * 0.8); x = (W - cw) // 2
crop = hero.crop((x, 0, x + cw, H))
for w in [480, 720, 870]:
    fit(crop, w).save(f"{OUT}/arch-{w}.avif", "AVIF", quality=45, speed=4)
    fit(crop, w).save(f"{OUT}/arch-{w}.webp", "WEBP", quality=70, method=6)
