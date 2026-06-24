/**
 * Calculates crop and scale parameters for fitting an image to a viewport
 * with "cover" behavior (image completely fills viewport, subject centered)
 */
export interface CropParams {
    /** Source image X coordinate to start cropping from */
    srcX: number;
    /** Source image Y coordinate to start cropping from */
    srcY: number;
    /** Width of the source crop area */
    srcWidth: number;
    /** Height of the source crop area */
    srcHeight: number;
    /** Destination X coordinate */
    destX: number;
    /** Destination Y coordinate */
    destY: number;
    /** Destination width */
    destWidth: number;
    /** Destination height */
    destHeight: number;
}

/**
 * Calculates how to crop and position an image to fill a viewport
 * while maintaining aspect ratio and centering the subject
 * 
 * @param imgWidth - Original image width
 * @param imgHeight - Original image height
 * @param slotWidth - Target slot/viewport width
 * @param slotHeight - Target slot/viewport height
 * @returns CropParams for canvas drawImage operation
 */
export const calculateCropParams = (
    imgWidth: number,
    imgHeight: number,
    slotWidth: number,
    slotHeight: number
): CropParams => {
    // Calculate aspect ratios
    const imgAspect = imgWidth / imgHeight;
    const slotAspect = slotWidth / slotHeight;

    let srcWidth = imgWidth;
    let srcHeight = imgHeight;
    let srcX = 0;
    let srcY = 0;

    // If image is wider than slot aspect ratio, crop width
    if (imgAspect > slotAspect) {
        srcWidth = imgHeight * slotAspect;
        srcX = (imgWidth - srcWidth) / 2; // Center horizontally
    }
    // If image is taller than slot aspect ratio, crop height
    else if (imgAspect < slotAspect) {
        srcHeight = imgWidth / slotAspect;
        srcY = (imgHeight - srcHeight) / 2; // Center vertically
    }

    // Draw the cropped image to completely fill the slot
    return {
        srcX: Math.round(srcX),
        srcY: Math.round(srcY),
        srcWidth: Math.round(srcWidth),
        srcHeight: Math.round(srcHeight),
        destX: 0,
        destY: 0,
        destWidth: slotWidth,
        destHeight: slotHeight,
    };
};

/**
 * Draws a cropped image on a canvas context to fill a rectangular area
 * This ensures the image completely fills the viewport without distortion
 * and the subject is centered
 * 
 * @param ctx - Canvas 2D context
 * @param img - Image element to draw
 * @param x - X coordinate of the slot
 * @param y - Y coordinate of the slot
 * @param width - Width of the slot
 * @param height - Height of the slot
 */
export const drawCroppedImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    width: number,
    height: number
): void => {
    const cropParams = calculateCropParams(
        img.width,
        img.height,
        width,
        height
    );

    // Save context state
    ctx.save();

    // Create clipping region for this slot
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();

    // Draw the cropped image
    ctx.drawImage(
        img,
        cropParams.srcX,
        cropParams.srcY,
        cropParams.srcWidth,
        cropParams.srcHeight,
        x + cropParams.destX,
        y + cropParams.destY,
        cropParams.destWidth,
        cropParams.destHeight
    );

    // Restore context state
    ctx.restore();
};
