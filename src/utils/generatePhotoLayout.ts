import { templates } from "./templates";

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
        (photos.length - 1) * GAP +
        100 * scale;

    const canvas = document.createElement("canvas");

    canvas.width = W;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No canvas context");
    }

    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, W, height);

    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${42 * scale}px Arial`;
    ctx.textAlign = "center";
    ctx.fillText(cfg.title, W / 2, 80 * scale);

    let y = HH;

    for (const photo of photos) {
        const img = await loadImage(photo);

        ctx.drawImage(
            img,
            PAD,
            y,
            W - PAD * 2,
            PH
        );

        y += PH + GAP;
    }

    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${28 * scale}px Arial`;
    ctx.fillText(
        text,
        W / 2,
        height - 30 * scale
    );

    if (cfg.frameSrc) {
        const frame = await loadImage(cfg.frameSrc);
        ctx.drawImage(frame, 0, 0, W, height);
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

    const width = 1000 * scale;
    const height = 1300 * scale;

    const padding = 30 * scale;
    const gap = 20 * scale;

    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No canvas context");
    }

    ctx.fillStyle = cfg.bg;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${42 * scale}px Arial`;
    ctx.textAlign = "center";

    ctx.fillText(
        cfg.title,
        width / 2,
        80 * scale
    );

    const photoWidth =
        (width - padding * 2 - gap) / 2;

    const photoHeight = 450 * scale;

    const positions = [
        {
            x: padding,
            y: 150 * scale,
        },
        {
            x: padding + photoWidth + gap,
            y: 150 * scale,
        },
        {
            x: padding,
            y: 150 * scale + photoHeight + gap,
        },
        {
            x: padding + photoWidth + gap,
            y: 150 * scale + photoHeight + gap,
        },
    ];

    for (
        let i = 0;
        i < Math.min(photos.length, 4);
        i++
    ) {
        const img = await loadImage(
            photos[i]
        );

        ctx.drawImage(
            img,
            positions[i].x,
            positions[i].y,
            photoWidth,
            photoHeight
        );
    }

    ctx.fillStyle = cfg.text;
    ctx.font = `bold ${28 * scale}px Arial`;

    ctx.fillText(
        text,
        width / 2,
        height - 50 * scale
    );

    if (cfg.frameSrc) {
        const frame = await loadImage(cfg.frameSrc);
        ctx.drawImage(frame, 0, 0, width, height);
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