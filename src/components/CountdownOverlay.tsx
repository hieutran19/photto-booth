interface Props {
    countdown: number | null;
}

export default function CountdownOverlay({
    countdown,
}: Props) {
    if (countdown === null) return null;

    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "rgba(0,0,0,0.35)",
                borderRadius: 12,
            }}
        >
            <span
                style={{
                    fontSize: 120,
                    color: "#fff",
                    fontWeight: 700,
                }}
            >
                {countdown}
            </span>
        </div>
    );
}