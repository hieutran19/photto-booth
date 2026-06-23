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
            <svg
                width="0"
                height="0"
                style={{ position: "absolute" }}
            >
                <defs>
                    <clipPath id="camera-mask" clipPathUnits="objectBoundingBox">
                        {maskSlots?.map((slot: any, index: number) => (
                            <rect
                                key={index}
                                x={slot.x}
                                y={slot.y}
                                width={slot.width}
                                height={slot.height}
                            />
                        ))}
                    </clipPath>
                </defs>
            </svg>

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
                    clipPath: maskSlots ? "url(#camera-mask)" : undefined,
                    WebkitClipPath: maskSlots ? "url(#camera-mask)" : undefined,
                }}
            />
        </div>
    );
}
