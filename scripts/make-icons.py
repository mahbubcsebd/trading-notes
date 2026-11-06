"""Generate PWA icons: gold serif "T" on ink-navy. Run: python scripts/make-icons.py"""
from PIL import Image, ImageDraw, ImageFont

NAVY = (12, 17, 32)
GOLD = (217, 183, 126)
FONT = "C:/Windows/Fonts/georgia.ttf"


def make(size: int, glyph_ratio: float, rounded: bool) -> Image.Image:
    img = Image.new("RGBA", (size, size), NAVY + (255,))
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(FONT, int(size * glyph_ratio))
    d.text((size / 2, size / 2), "T", font=font, fill=GOLD, anchor="mm")
    if rounded:
        mask = Image.new("L", (size, size), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, size, size), size // 5, fill=255)
        out = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        out.paste(img, mask=mask)
        return out
    return img


# "any": rounded tile. "maskable": full bleed, glyph inside 80% safe zone.
make(192, 0.62, True).save("public/icons/icon-192.png")
make(512, 0.62, True).save("public/icons/icon-512.png")
make(512, 0.46, False).save("public/icons/maskable-512.png")
make(180, 0.5, False).convert("RGB").save("public/icons/apple-touch-icon.png")
