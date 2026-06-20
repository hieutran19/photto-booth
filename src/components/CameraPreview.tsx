export default function CameraPreview({
    videoRef,
    filter = "none",
}: any) {
    return (
        <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
                width: "100%",
                aspectRatio: "4/3",
                objectFit: "cover",
                transform: "scaleX(-1)",
                filter:
                    filter === "grayscale"
                        ? "grayscale(1)"
                        : filter === "sepia"
                            ? "sepia(1)"
                            : "none",
                borderRadius: 12,
            }}
        />
    );
}