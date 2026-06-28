import { useState } from "react";

import CameraPreview from "./CameraPreview";
import CountdownOverlay from "./CountdownOverlay";
import FlashOverlay from "./FlashOverlay";
import PhotoGallery from "./PhotoGallery";
import ActionButtons from "./ActionButtons";
import PhotoStripPreview from "./PhotoStripPreview";

import { useCamera } from "../hooks/useCamera";
import { capturePhoto } from "../utils/capturePhoto";
import { generatePhotoLayout } from "../utils/generatePhotoLayout";
import { uploadToCloudinary } from "../utils/cloudinary";
import { templates } from "../utils/templates";

import type { PhotoTemplate } from "../types/template";
import type { PhotoLayout } from "../types/layout";

export default function Camera() {
    const { videoRef } = useCamera();

    const [photos, setPhotos] = useState<string[]>([]);
    const [photoStrip, setPhotoStrip] = useState("");

    const [countdown, setCountdown] =
        useState<number | null>(null);

    const [isCapturing, setIsCapturing] =
        useState(false);

    const [isFlashing, setIsFlashing] =
        useState(false);

    const [template, setTemplate] =
        useState<PhotoTemplate>("classic");

    const [layout, setLayout] =
        useState<PhotoLayout>("strip");

    const [text, setText] =
        useState("My Memories 💖");

    const [filter, setFilter] = useState<
        "none" | "grayscale" | "sepia"
    >("none");

    const [shareUrl, setShareUrl] =
        useState("");

    const [isUploading, setIsUploading] =
        useState(false);

    const [activeFrameOverlayIndex, setActiveFrameOverlayIndex] =
        useState(0);

    const sleep = (ms: number) =>
        new Promise((resolve) =>
            setTimeout(resolve, ms)
        );

    const startCountdown = async () => {
        for (let i = 3; i > 0; i--) {
            setCountdown(i);

            await sleep(1000);
        }

        setCountdown(null);
    };

    const triggerFlash = async () => {
        setIsFlashing(true);

        await sleep(150);

        setIsFlashing(false);
    };

    const startPhotoSession = async () => {
        if (!videoRef.current) return;

        setPhotos([]);
        setPhotoStrip("");
        setShareUrl("");
        setActiveFrameOverlayIndex(0);

        setIsCapturing(true);

        const captured: string[] = [];

        try {
            for (let i = 0; i < 4; i++) {
                setActiveFrameOverlayIndex(i);

                await startCountdown();

                await triggerFlash();

                const image = capturePhoto(
                    videoRef.current,
                    filter
                );

                if (image) {
                    captured.push(image);

                    setPhotos((prev) => [
                        ...prev,
                        image,
                    ]);
                }

                await sleep(500);
            }

            const result =
                await generatePhotoLayout(
                    captured,
                    template,
                    layout,
                    text
                );

            setPhotoStrip(result);
        } finally {
            setIsCapturing(false);
            setCountdown(null);
            setIsFlashing(false);
        }
    };

    const resetAll = () => {
        setPhotos([]);
        setPhotoStrip("");
        setShareUrl("");
        setCountdown(null);
        setIsCapturing(false);
        setIsFlashing(false);
        setActiveFrameOverlayIndex(0);
    };

    const download = () => {
        if (!photoStrip) return;

        const link =
            document.createElement("a");

        link.href = photoStrip;

        link.download = `photo-booth-${Date.now()}.png`;

        link.click();
    };

    const handleShare = async () => {
        if (!photoStrip) return;

        try {
            setIsUploading(true);

            const url =
                await uploadToCloudinary(
                    photoStrip
                );

            setShareUrl(url);
        } catch (error) {
            console.error(
                "Upload failed:",
                error
            );
        } finally {
            setIsUploading(false);
        }
    };

    const currentTemplate = templates[template];
    const frameOverlays = Array.isArray(currentTemplate?.frameOverlay)
        ? currentTemplate.frameOverlay
        : currentTemplate?.frameOverlay
            ? [currentTemplate.frameOverlay]
            : [];
    const activeFrameOverlay = frameOverlays[Math.min(activeFrameOverlayIndex, frameOverlays.length - 1)];

    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: 16,
            }}
        >
            <div
                style={{
                    position: "relative",
                    maxWidth: 800,
                    overflow: "hidden",
                }}
            >
                <CameraPreview
                    videoRef={videoRef}
                    filter={filter}
                    slots={templates[template]?.slots}
                    aspectRatio={templates[template]?.aspectRatio ?? "9 / 16"}
                    objectFit="contain"
                />

                {currentTemplate?.frameSrc && activeFrameOverlay ? (
                    <img
                        src={currentTemplate.frameSrc}
                        alt={`${template} frame`}
                        style={{
                            position: "absolute",
                            top: activeFrameOverlay.top ?? "0%",
                            left: activeFrameOverlay.left ?? "0%",
                            width: activeFrameOverlay.width ?? "100%",
                            height: activeFrameOverlay.height ?? "100%",
                            objectFit: activeFrameOverlay.objectFit ?? "cover",
                            pointerEvents: "none",
                        }}
                    />
                ) : null}

                <FlashOverlay
                    isVisible={isFlashing}
                />

                <CountdownOverlay
                    countdown={countdown}
                />
            </div>

            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                }}
            >
                <select
                    value={template}
                    onChange={(e) =>
                        setTemplate(
                            e.target
                                .value as PhotoTemplate
                        )
                    }
                >
                    <option value="classic">
                        Classic
                    </option>

                    <option value="dark">
                        Dark
                    </option>

                    <option value="polaroid">
                        Polaroid
                    </option>

                    <option value="newspaper">
                        NewsPaper
                    </option>

                    <option value="parkbogum">
                        ParkBoGum
                    </option>
                </select>

                <select
                    value={layout}
                    onChange={(e) =>
                        setLayout(
                            e.target
                                .value as PhotoLayout
                        )
                    }
                >
                    <option value="strip">
                        Strip
                    </option>

                    <option value="grid">
                        Grid 2x2
                    </option>
                </select>

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(
                            e.target.value as
                            | "none"
                            | "grayscale"
                            | "sepia"
                        )
                    }
                >
                    <option value="none">
                        Normal
                    </option>

                    <option value="grayscale">
                        B&W
                    </option>

                    <option value="sepia">
                        Vintage
                    </option>
                </select>

                <input
                    value={text}
                    onChange={(e) =>
                        setText(
                            e.target.value
                        )
                    }
                    placeholder="Custom text..."
                />
            </div>

            <ActionButtons
                isCapturing={isCapturing}
                onStart={startPhotoSession}
                onReset={resetAll}
            />

            <PhotoGallery photos={photos} />

            <PhotoStripPreview
                photoStrip={photoStrip}
                layout={layout}
                shareUrl={shareUrl}
                isUploading={isUploading}
                onDownload={download}
                onShare={handleShare}
                onCopyShareUrl={() =>
                    navigator.clipboard.writeText(shareUrl)
                }
            />
        </div>
    );
}