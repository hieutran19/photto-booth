import { templates } from "./templates";
import type { PhotoTemplate } from "../types/template";

export const generatePhotoStrip = async (
    photos: string[],
    template: PhotoTemplate = "classic",
    text: string = "My Memories 💖",
    scale = 3
): Promise<string> => {
    const cfg = templates[template];

    const width = 800;
    const photoHeight = 500;
    const gap = 24;
    const padding = 24;
    const headerHeight = 120;

    const W = width * scale;
    const PH = photoHeight * scale;
    const GAP = gap * scale;
    const PAD = padding * scale;
    const HH = headerHeight * scale;

    const height =
        HH +
        PAD * 2 +
        photos.length * PH +
        (photos.length - 1) * GAP;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No context");

    // background
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, W, height);

    // title
    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${42 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(cfg.title, W / 2, 80 * scale);

    let y = HH;

    for (const photo of photos) {
        const img = await loadImage(photo);

        ctx.drawImage(img, PAD, y, W - PAD * 2, PH);

        y += PH + GAP;
    }

    // footer text (editable)
    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${28 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(text, W / 2, height - 40 * scale);

    return canvas.toDataURL("image/png");
};

const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });