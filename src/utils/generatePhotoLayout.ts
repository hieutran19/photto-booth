import { templates } from "./templates";
import { templateLayouts } from "../data/template-layouts";
import { drawCroppedImage } from "./cropPhoto";

import type { PhotoTemplate } from "../types/template";
import type { PhotoLayout } from "../types/layout";

export const generatePhotoLayout = async (
    photos: string[],
    template: PhotoTemplate,
    layout: PhotoLayout,
    text: string,
    scale = 2
): Promise<string> => {
    if (layout === "grid") {
        return generateGrid(
            photos,
            template,
            text,
            scale
        );
    }

    return generateStrip(
        photos,
        template,
        text,
        scale
    );
};

const generateStrip = async (
    photos: string[],
    template: PhotoTemplate,
    text: string,
    scale: number
) => {
    const cfg = templates[template];
    const layout = templateLayouts[template];

    // Apply scale to all dimensions
    const W = layout.frame.width * scale;
    const H = layout.frame.height * scale;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No canvas context");
    }

    // Draw background
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, W, H);

    // Draw title
    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${42 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(cfg.title, W / 2, 80 * scale);

    // Draw photos in their designated slots
    for (let i = 0; i < Math.min(photos.length, layout.slots.length); i++) {
        const photo = photos[i];
        const slot = layout.slots[i];
        const img = await loadImage(photo);

        const slotX = slot.x * scale;
        const slotY = slot.y * scale;
        const slotW = slot.width * scale;
        const slotH = slot.height * scale;

        // Use cropped image to fill slot completely with centered subject
        drawCroppedImage(ctx, img, slotX, slotY, slotW, slotH);
    }

    // Draw text at bottom
    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${28 * scale}px Arial`;
    ctx.fillText(text, W / 2, H - 30 * scale);

    // Draw frame overlay on top
    if (cfg.frameSrc) {
        const frame = await loadImage(cfg.frameSrc);
        ctx.drawImage(frame, 0, 0, W, H);
    }

    return canvas.toDataURL("image/png");
};

const generateGrid = async (
    photos: string[],
    template: PhotoTemplate,
    text: string,
    scale: number
) => {
    const cfg = templates[template];
    const layout = templateLayouts[template];

    // Apply scale to all dimensions
    const W = layout.frame.width * scale;
    const H = layout.frame.height * scale;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No canvas context");
    }

    // Draw background
    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, W, H);

    // Draw title
    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${42 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(cfg.title, W / 2, 80 * scale);

    // Draw photos in their designated slots
    for (let i = 0; i < Math.min(photos.length, layout.slots.length); i++) {
        const photo = photos[i];
        const slot = layout.slots[i];
        const img = await loadImage(photo);

        const slotX = slot.x * scale;
        const slotY = slot.y * scale;
        const slotW = slot.width * scale;
        const slotH = slot.height * scale;

        // Use cropped image to fill slot completely with centered subject
        drawCroppedImage(ctx, img, slotX, slotY, slotW, slotH);
    }

    // Draw text at bottom
    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${28 * scale}px Arial`;
    ctx.fillText(text, W / 2, H - 50 * scale);

    // Draw frame overlay on top
    if (cfg.frameSrc) {
        const frame = await loadImage(cfg.frameSrc);
        ctx.drawImage(frame, 0, 0, W, H);
    }

    return canvas.toDataURL("image/png");
};

const loadImage = (
    src: string
): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });