export const capturePhoto = (
    video: HTMLVideoElement,
    filter: "none" | "grayscale" | "sepia" = "none"
) => {
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    if (filter === "grayscale") {
        ctx.filter = "grayscale(1)";
    } else if (filter === "sepia") {
        ctx.filter = "sepia(1)";
    } else {
        ctx.filter = "none";
    }

    ctx.drawImage(video, 0, 0);

    return canvas.toDataURL("image/png");
};