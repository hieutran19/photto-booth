import { useState } from "react";

import CameraPreview from "./CameraPreview";
import CountdownOverlay from "./CountdownOverlay";
import FlashOverlay from "./FlashOverlay";
import PhotoGallery from "./PhotoGallery";
import ActionButtons from "./ActionButtons";

import { useCamera } from "../hooks/useCamera";
import { capturePhoto } from "../utils/capturePhoto";
import { sleep } from "../utils/sleep";
import { generatePhotoStrip } from "../utils/generatePhotoStrip";

export default function Camera() {
    const { videoRef } = useCamera();

    const [photos, setPhotos] = useState<string[]>([]);
    const [photoStrip, setPhotoStrip] = useState<string>("");
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [isFlashing, setIsFlashing] = useState(false);

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

    const downloadStrip = () => {
        if (!photoStrip) return;

        const a = document.createElement("a");
        a.href = photoStrip;
        a.download = `photo-booth-${Date.now()}.png`;
        a.click();
    };

    const startPhotoSession = async () => {
        if (!videoRef.current) return;

        setPhotos([]);
        setPhotoStrip("");
        setIsCapturing(true);

        const captured: string[] = [];

        try {
            for (let i = 0; i < 4; i++) {
                await startCountdown();
                await triggerFlash();

                const image = capturePhoto(videoRef.current);

                if (image) {
                    captured.push(image);
                    setPhotos((prev) => [...prev, image]);
                }

                await sleep(500);
            }

            const strip = await generatePhotoStrip(captured);
            setPhotoStrip(strip);
        } finally {
            setIsCapturing(false);
            setCountdown(null);
            setIsFlashing(false);
        }
    };

    const resetPhotos = () => {
        setPhotos([]);
        setPhotoStrip("");
        setCountdown(null);
        setIsCapturing(false);
        setIsFlashing(false);
    };

    return (
        <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: 16 }}>
            <div style={{ position: "relative", maxWidth: 800 }}>
                <CameraPreview videoRef={videoRef} />

                <FlashOverlay isVisible={isFlashing} />

                <CountdownOverlay countdown={countdown} />
            </div>

            <ActionButtons
                isCapturing={isCapturing}
                onStart={startPhotoSession}
                onReset={resetPhotos}
            />

            <button
                onClick={downloadStrip}
                disabled={!photoStrip}
                style={{
                    marginTop: 12,
                    padding: "10px 16px",
                    cursor: "pointer",
                }}
            >
                Download Photo Strip
            </button>

            <PhotoGallery photos={photos} />

            {photoStrip && (
                <div style={{ marginTop: 24 }}>
                    <h3>Photo Strip</h3>
                    <img
                        src={photoStrip}
                        style={{
                            width: 300,
                            maxWidth: "100%",
                            borderRadius: 12,
                            border: "1px solid #ddd",
                        }}
                    />
                </div>
            )}
        </div>
    );
}