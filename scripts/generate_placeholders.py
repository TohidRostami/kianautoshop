"""
Generates placeholder "photos" for every automobile in the gallery.

These are NOT real car photos — they're clearly-labeled on-brand placeholders
(background + a simple car silhouette + the car's name) so the site looks
complete and every <Image> resolves correctly before real photography is
dropped in. See public/images/automobiles/README.md for the exact files to
replace.
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 900

PALETTE = {
    "ink": (55, 50, 46),
    "surface": (66, 60, 55),
    "taupe": (82, 73, 68),
    "stone": (108, 106, 104),
    "mist": (179, 178, 176),
    "paper": (246, 243, 238),
    "rust": (179, 75, 12),
    "rust_dark": (124, 51, 6),
}

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"

CARS = [
    ("mercedes-benz-c300", "MERCEDES-BENZ", "C300"),
    ("bmw-530i", "BMW", "530i"),
    ("range-rover-sport", "LAND ROVER", "RANGE ROVER SPORT"),
    ("porsche-911-carrera", "PORSCHE", "911 CARRERA"),
    ("toyota-land-cruiser-gxr", "TOYOTA", "LAND CRUISER GXR"),
    ("audi-a6-55-tfsi", "AUDI", "A6 55 TFSI"),
    ("lexus-es-350", "LEXUS", "ES 350"),
    ("ford-mustang-gt", "FORD", "MUSTANG GT"),
]

# One background tone per photo index (front / side / interior / detail)
BG_CYCLE = ["surface", "taupe", "ink", "surface"]
SHOT_LABELS = ["EXTERIOR — FRONT", "EXTERIOR — SIDE", "INTERIOR", "DETAIL"]


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vertical_gradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", size, top)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        t = y / max(h - 1, 1)
        draw.line([(0, y), (w, y)], fill=lerp(top, bottom, t))
    return base


def draw_car_silhouette(draw, cx, cy, scale, color):
    """A simple, abstract car side-profile made of basic shapes."""
    w = 420 * scale
    h = 130 * scale
    left = cx - w / 2
    top = cy - h / 2

    body = [
        (left, top + h * 0.55),
        (left + w * 0.08, top + h * 0.55),
        (left + w * 0.22, top + h * 0.15),
        (left + w * 0.62, top + h * 0.05),
        (left + w * 0.82, top + h * 0.30),
        (left + w, top + h * 0.55),
        (left + w, top + h * 0.85),
        (left, top + h * 0.85),
    ]
    draw.polygon(body, outline=color, width=6)

    wheel_r = h * 0.28
    for wx in (left + w * 0.24, left + w * 0.76):
        wy = top + h * 0.85
        draw.ellipse(
            [wx - wheel_r, wy - wheel_r, wx + wheel_r, wy + wheel_r],
            outline=color,
            width=6,
        )


def make_image(slug, brand, model, index):
    bg_key = BG_CYCLE[index]
    top = PALETTE[bg_key]
    bottom = PALETTE["ink"]
    img = vertical_gradient((W, H), top, bottom)
    draw = ImageDraw.Draw(img)

    # Subtle silhouette motif
    draw_car_silhouette(draw, W / 2, H * 0.46, 1.55, PALETTE["stone"])

    # Thin rust frame
    border = 10
    draw.rectangle(
        [border, border, W - border, H - border],
        outline=PALETTE["rust"],
        width=4,
    )

    # Corner shot-type label
    label_font = ImageFont.truetype(FONT_BOLD, 22)
    label = SHOT_LABELS[index]
    draw.text((48, 44), label, font=label_font, fill=PALETTE["rust"])

    # Corner index badge
    idx_font = ImageFont.truetype(FONT_BOLD, 22)
    idx_text = f"{index + 1:02d} / {len(SHOT_LABELS):02d}"
    bbox = draw.textbbox((0, 0), idx_text, font=idx_font)
    tw = bbox[2] - bbox[0]
    draw.text((W - 48 - tw, 44), idx_text, font=idx_font, fill=PALETTE["mist"])

    # Brand (small, tracked) + model (large, bold), centered
    brand_font = ImageFont.truetype(FONT_REG, 34)
    model_font = ImageFont.truetype(FONT_BOLD, 64)

    # Manually letter-space the brand string for a tracked-caps look
    tracked_brand = " ".join(list(brand))
    bbox_b = draw.textbbox((0, 0), tracked_brand, font=brand_font)
    bw = bbox_b[2] - bbox_b[0]
    draw.text(
        (W / 2 - bw / 2, H * 0.68),
        tracked_brand,
        font=brand_font,
        fill=PALETTE["mist"],
    )

    bbox_m = draw.textbbox((0, 0), model, font=model_font)
    mw = bbox_m[2] - bbox_m[0]
    draw.text(
        (W / 2 - mw / 2, H * 0.73),
        model,
        font=model_font,
        fill=PALETTE["paper"],
    )

    img = img.filter(ImageFilter.GaussianBlur(0))  # no-op, keeps crisp edges
    return img


def main():
    base_dir = os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
        "public",
        "images",
        "automobiles",
    )
    for slug, brand, model in CARS:
        out_dir = os.path.join(base_dir, slug)
        os.makedirs(out_dir, exist_ok=True)
        for i in range(4):
            img = make_image(slug, brand, model, i)
            path = os.path.join(out_dir, f"{i + 1}.jpg")
            img.save(path, "JPEG", quality=87)
            print("wrote", path)


if __name__ == "__main__":
    main()
