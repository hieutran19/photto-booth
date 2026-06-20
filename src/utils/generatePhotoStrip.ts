export const generatePhotoStrip = async (
    photos: string[]
): Promise<string> => {
    const canvas = document.createElement("canvas");

    const width = 600;
    const photoHeight = 450;
    const gap = 20;
    const padding = 20;
    const headerHeight = 100;

    const height =
        headerHeight +
        padding * 2 +
        photoHeight * photos.length +
        gap * (photos.length - 1);

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Canvas context not found");
    }

    // background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // title
    ctx.fillStyle = "#000";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
        "PHOTO BOOTH",
        width / 2,
        65
    );

    let currentY = headerHeight;

    for (const photo of photos) {
        const image = await loadImage(photo);

        ctx.drawImage(
            image,
            padding,
            currentY,
            width - padding * 2,
            photoHeight
        );

        currentY += photoHeight + gap;
    }

    return canvas.toDataURL("image/png");
};

const loadImage = (
    src: string
): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => resolve(image);
        image.onerror = reject;

        image.src = src;
    });
};