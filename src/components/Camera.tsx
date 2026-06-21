import { useState } from "react";

import CameraPreview from "./CameraPreview";
import CountdownOverlay from "./CountdownOverlay";
import FlashOverlay from "./FlashOverlay";
import PhotoGallery from "./PhotoGallery";
import ActionButtons from "./ActionButtons";

import { useCamera } from "../hooks/useCamera";
import { capturePhoto } from "../utils/capturePhoto";
import { generatePhotoLayout } from "../utils/generatePhotoLayout";
import { uploadToCloudinary } from "../utils/cloudinary";

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

        setIsCapturing(true);

        const captured: string[] = [];

        try {
            for (let i = 0; i < 4; i++) {
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
                }}
            >
                <CameraPreview
                    videoRef={videoRef}
                    filter={filter}
                />

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

            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={download}
                    disabled={!photoStrip}
                >
                    Download
                </button>

                <button
                    onClick={handleShare}
                    disabled={
                        !photoStrip ||
                        isUploading
                    }
                >
                    {isUploading
                        ? "Uploading..."
                        : "Share"}
                </button>
            </div>

            {shareUrl && (
                <div
                    style={{
                        marginTop: 16,
                    }}
                >
                    <p>Share Link</p>

                    <a
                        href={shareUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Open Image
                    </a>

                    <button
                        onClick={() =>
                            navigator.clipboard.writeText(
                                shareUrl
                            )
                        }
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        Copy
                    </button>
                </div>
            )}

            <PhotoGallery photos={photos} />

            {photoStrip && (
                <div
                    style={{
                        marginTop: 24,
                    }}
                >
                    <h3>
                        {layout === "strip"
                            ? "Photo Strip"
                            : "Photo Grid"}
                    </h3>

                    <img
                        src={photoStrip}
                        alt="result"
                        style={{
                            width: 320,
                            maxWidth: "100%",
                            borderRadius: 12,
                            border:
                                "1px solid #ddd",
                        }}
                    />
                </div>
            )}
        </div>
    );
}