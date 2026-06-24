import React from "react";

export default function CameraPreview({
    videoRef,
    filter = "none",
    maskSlots,
}: any) {

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: 12,
                background: "#000",
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scaleX(-1)",
                    filter:
                        filter === "grayscale"
                            ? "grayscale(1)"
                            : filter === "sepia"
                                ? "sepia(1)"
                                : "none",
                }}
            />
        </div>
    );
}
