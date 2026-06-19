import { useEffect, useRef, useState } from "react";

export default function Camera() {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [photos, setPhotos] = useState<string[]>([]);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Cannot access camera:", error);
            }
        };

        startCamera();

        return () => {
            const stream = videoRef.current?.srcObject as MediaStream | null;

            stream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    const capturePhoto = () => {
        if (photos.length >= 4) {
            return;
        }

        const video = videoRef.current;

        if (!video) return;

        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        ctx.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const image = canvas.toDataURL("image/png");

        setPhotos((prev) => [...prev, image]);
    };

    const resetPhotos = () => {
        setPhotos([]);
    };

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "16px",
                boxSizing: "border-box",
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: "100%",
                    maxWidth: "800px",
                    aspectRatio: "4 / 3",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    display: "block",
                }}
            />

            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 12,
                    flexWrap: "wrap",
                }}
            >
                <button
                    onClick={capturePhoto}
                    disabled={photos.length >= 4}
                    style={{
                        padding: "12px 20px",
                        minWidth: "140px",
                        cursor: "pointer",
                    }}
                >
                    Take Photo ({photos.length}/4)
                </button>

                <button
                    onClick={resetPhotos}
                    style={{
                        padding: "12px 20px",
                        minWidth: "140px",
                        cursor: "pointer",
                    }}
                >
                    Reset
                </button>
            </div>

            {photos.length > 0 && (
                <>
                    <h3
                        style={{
                            marginTop: 24,
                        }}
                    >
                        Captured Photos
                    </h3>

                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            overflowX: "auto",
                            paddingBottom: 8,
                        }}
                    >
                        {photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`photo-${index + 1}`}
                                style={{
                                    width: 120,
                                    flexShrink: 0,
                                    borderRadius: 12,
                                    border: "1px solid #ddd",
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}