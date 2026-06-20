interface Props {
    isCapturing: boolean;
    onStart: () => void;
    onReset: () => void;
}

export default function ActionButtons({
    isCapturing,
    onStart,
    onReset,
}: Props) {
    return (
        <div
            style={{
                marginTop: 16,
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
            }}
        >
            <button
                onClick={onStart}
                disabled={isCapturing}
                style={{
                    padding: "12px 20px",
                    minWidth: 160,
                    cursor: isCapturing
                        ? "not-allowed"
                        : "pointer",
                }}
            >
                {isCapturing
                    ? "Capturing..."
                    : "Start Session"}
            </button>

            <button
                onClick={onReset}
                disabled={isCapturing}
                style={{
                    padding: "12px 20px",
                    minWidth: 120,
                    cursor: isCapturing
                        ? "not-allowed"
                        : "pointer",
                }}
            >
                Reset
            </button>
        </div>
    );
}