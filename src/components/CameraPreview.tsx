interface Props {
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function CameraPreview({
    videoRef,
}: Props) {
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
                borderRadius: 12,
            }}
        />
    );
}