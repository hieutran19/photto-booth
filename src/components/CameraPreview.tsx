import React from "react";

import type { PreviewSlot } from "../types/template";

type Props = {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    filter?: "none" | "grayscale" | "sepia";
    slots?: PreviewSlot[];

    // Thêm mới
    aspectRatio?: string;
    objectFit?: "contain" | "cover";
};

export default function CameraPreview({
    videoRef,
    filter = "none",
    slots,
    aspectRatio = "9 / 16",
    objectFit = "contain",
}: Props) {
    const resolveSize = (value: number | string | undefined) => {
        if (value === undefined) return undefined;
        if (typeof value === "number") {
            return `${value}px`;
        }
        return value;
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                aspectRatio,
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
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit,
                    transform: "scaleX(-1)",
                    filter:
                        filter === "grayscale"
                            ? "grayscale(1)"
                            : filter === "sepia"
                                ? "sepia(1)"
                                : "none",
                }}
            />

            {slots?.map((slot, index) => (
                <div
                    key={`${slot.x}-${slot.y}-${index}`}
                    style={{
                        position: "absolute",
                        left: slot.left ?? resolveSize(slot.x),
                        top: slot.top ?? resolveSize(slot.y),
                        width: slot.slotWidth ?? resolveSize(slot.width),
                        height: slot.slotHeight ?? resolveSize(slot.height),
                        border: "2px solid rgba(255,255,255,0.95)",
                        borderRadius: 8,
                        boxSizing: "border-box",
                        pointerEvents: "none",
                        background: "rgba(255,255,255,0.08)",
                    }}
                />
            ))}
        </div>
    );
}