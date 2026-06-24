import React from "react";

export type FrameRect = { x: number; y: number; width: number; height: number };

export default function FrameOverlay({ rect, label }: { rect: FrameRect; label?: string }) {
    const style: React.CSSProperties = {
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        border: "2px solid rgba(0,255,204,0.9)",
        boxSizing: "border-box",
        pointerEvents: "none",
    };

    const labelStyle: React.CSSProperties = {
        position: "absolute",
        left: 0,
        top: -22,
        background: "rgba(0,0,0,0.6)",
        color: "#fff",
        padding: "2px 6px",
        fontSize: 12,
        borderRadius: 4,
        pointerEvents: "none",
    };

    return (
        <div style={style} aria-hidden>
            {label && <div style={labelStyle}>{label}</div>}
        </div>
    );
}
