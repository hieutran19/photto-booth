import { useState } from "react";

import CameraPreview from "./CameraPreview";
import CountdownOverlay from "./CountdownOverlay";
import PhotoGallery from "./PhotoGallery";

import { useCamera } from "../hooks/useCamera";
import { capturePhoto } from "../utils/capturePhoto";
import { sleep } from "../utils/sleep";

export default function Camera() {
    const { videoRef } = useCamera();

    const [photos, setPhotos] = useState<string[]>([]);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    const startCountdown = async () => {
        for (let i = 3; i > 0; i--) {
            setCountdown(i);
            await sleep(1000);
        }

        setCountdown(null);
    };

    const startPhotoSession = async () => {
        if (!videoRef.current) return;

        setPhotos([]);
        setIsCapturing(true);

        try {
            for (let i = 0; i < 4; i++) {
                await startCountdown();

                const image = capturePhoto(
                    videoRef.current
                );

                if (image) {
                    setPhotos((prev) => [
                        ...prev,
                        image,
                    ]);
                }

                await sleep(500);
            }
        } finally {
            setIsCapturing(false);
        }
    };

    const resetPhotos = () => {
        setPhotos([]);
        setCountdown(null);
        setIsCapturing(false);
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: 16,
                boxSizing: "border-box",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "800px",
                }}
            >
                <CameraPreview videoRef={videoRef} />

                <CountdownOverlay
                    countdown={countdown}
                />
            </div>

            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={startPhotoSession}
                    disabled={isCapturing}
                    style={{
                        padding: "12px 20px",
                        minWidth: 160,
                        cursor: isCapturing
                            ? "not-allowed"
                            : "pointer",
                    }}
                >
                    {isCapturing
                        ? "Capturing..."
                        : "Start Session"}
                </button>

                <button
                    onClick={resetPhotos}
                    disabled={isCapturing}
                    style={{
                        padding: "12px 20px",
                        minWidth: 120,
                        cursor: isCapturing
                            ? "not-allowed"
                            : "pointer",
                    }}
                >
                    Reset
                </button>
            </div>

            <PhotoGallery photos={photos} />
        </div>
    );
}