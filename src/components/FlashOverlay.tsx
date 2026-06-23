interface Props {
    isVisible: boolean;
}

export default function FlashOverlay({
    isVisible,
}: Props) {
    if (!isVisible) return null;

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "#fff",
                opacity: 0.9,
                borderRadius: 12,
                pointerEvents: "none",
            }}
        />
    );
}