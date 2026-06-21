import { useState } from "react";

import CameraPreview from "./CameraPreview";
import CountdownOverlay from "./CountdownOverlay";
import FlashOverlay from "./FlashOverlay";
import PhotoGallery from "./PhotoGallery";
import ActionButtons from "./ActionButtons";

import { useCamera } from "../hooks/useCamera";
import { capturePhoto } from "../utils/capturePhoto";
import { generatePhotoStrip } from "../utils/generatePhotoStrip";
import { uploadToCloudinary } from "../utils/cloudinary";

import type { PhotoTemplate } from "../types/template";

export default function Camera() {
    const { videoRef } = useCamera();

    // photos
    const [photos, setPhotos] = useState<string[]>([]);
    const [photoStrip, setPhotoStrip] = useState("");

    // ui states
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);

    // feature states
    const [template, setTemplate] =
        useState<PhotoTemplate>("classic");
    const [text, setText] = useState("My Memories 💖");
    const [filter, setFilter] = useState<
        "none" | "grayscale" | "sepia"
    >("none");

    // share states
    const [shareUrl, setShareUrl] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // utils
    const sleepFn = (ms: number) =>
        new Promise((r) => setTimeout(r, ms));

    const startCountdown = async () => {
        for (let i = 3; i > 0; i--) {
            setCountdown(i);
            await sleepFn(1000);
        }
        setCountdown(null);
    };

    const triggerFlash = async () => {
        setIsFlashing(true);
        await sleepFn(150);
        setIsFlashing(false);
    };

    // capture session
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
                    setPhotos((p) => [...p, image]);
                }

                await sleepFn(500);
            }

            const strip = await generatePhotoStrip(
                captured,
                template,
                text
            );

            setPhotoStrip(strip);
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

    // download
    const download = () => {
        if (!photoStrip) return;

        const a = document.createElement("a");
        a.href = photoStrip;
        a.download = `photo-booth-${Date.now()}.png`;
        a.click();
    };

    // cloud upload
    const handleShare = async () => {
        if (!photoStrip) return;

        setIsUploading(true);

        try {
            const url = await uploadToCloudinary(photoStrip);
            setShareUrl(url);
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
            {/* CAMERA */}
            <div style={{ position: "relative", maxWidth: 800 }}>
                <CameraPreview
                    videoRef={videoRef}
                    filter={filter}
                />

                <FlashOverlay isVisible={isFlashing} />

                <CountdownOverlay countdown={countdown} />
            </div>

            {/* CONTROLS */}
            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <select
                    value={template}
                    onChange={(e) =>
                        setTemplate(
                            e.target.value as PhotoTemplate
                        )
                    }
                >
                    <option value="classic">Classic</option>
                    <option value="dark">Dark</option>
                    <option value="polaroid">Polaroid</option>
                </select>

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Text..."
                />

                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value as any)
                    }
                >
                    <option value="none">Normal</option>
                    <option value="grayscale">B&W</option>
                    <option value="sepia">Vintage</option>
                </select>
            </div>

            {/* ACTION BUTTONS */}
            <ActionButtons
                isCapturing={isCapturing}
                onStart={startPhotoSession}
                onReset={resetAll}
            />

            {/* DOWNLOAD + SHARE */}
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button
                    onClick={download}
                    disabled={!photoStrip}
                >
                    Download
                </button>

                <button
                    onClick={handleShare}
                    disabled={!photoStrip || isUploading}
                >
                    {isUploading ? "Uploading..." : "Share"}
                </button>
            </div>

            {/* SHARE RESULT */}
            {shareUrl && (
                <div style={{ marginTop: 12 }}>
                    <p>Share Link:</p>

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
                    >
                        Copy
                    </button>
                </div>
            )}

            {/* GALLERY */}
            <PhotoGallery photos={photos} />

            {/* STRIP PREVIEW */}
            {photoStrip && (
                <div style={{ marginTop: 20 }}>
                    <h3>Photo Strip</h3>

                    <img
                        src={photoStrip}
                        style={{
                            width: 320,
                            borderRadius: 12,
                        }}
                    />
                </div>
            )}
        </div>
    );
}