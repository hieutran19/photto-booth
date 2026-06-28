interface Props {
    photoStrip: string;
    layout: "strip" | "grid";
    shareUrl?: string;
    isUploading: boolean;
    onDownload: () => void;
    onShare: () => void;
    onCopyShareUrl: () => void;
}

export default function PhotoStripPreview({
    photoStrip,
    layout,
    shareUrl,
    isUploading,
    onDownload,
    onShare,
    onCopyShareUrl,
}: Props) {
    if (!photoStrip) return null;

    const title = layout === "strip" ? "Photo Strip" : "Photo Grid";
    const subtitle =
        layout === "strip"
            ? "Your 4-photo strip is ready to save or share."
            : "Your 2x2 photo grid is ready to save or share.";

    return (
        <div
            style={{
                marginTop: 24,
                padding: 20,
                borderRadius: 24,
                background:
                    "linear-gradient(135deg, #fffdfc 0%, #f8f3ff 100%)",
                border: "1px solid #e9d8ff",
                boxShadow:
                    "0 18px 45px rgba(139, 92, 246, 0.12)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    flexWrap: "wrap",
                }}
            >
                <div>
                    <p
                        style={{
                            margin: 0,
                            fontSize: 12,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#8b5cf6",
                            fontWeight: 700,
                        }}
                    >
                        Preview
                    </p>
                    <h3
                        style={{
                            margin: "4px 0 0",
                            fontSize: 22,
                            color: "#111827",
                        }}
                    >
                        {title}
                    </h3>
                    <p
                        style={{
                            margin: "4px 0 0",
                            color: "#6b7280",
                        }}
                    >
                        {subtitle}
                    </p>
                </div>

                <div
                    style={{
                        padding: "6px 12px",
                        borderRadius: 999,
                        background: "#f5e8ff",
                        color: "#7c3aed",
                        fontSize: 13,
                        fontWeight: 700,
                    }}
                >
                    {layout === "strip" ? "4 Photos" : "2x2 Grid"}
                </div>
            </div>

            <div
                style={{
                    marginTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <img
                    src={photoStrip}
                    alt="result"
                    style={{
                        width: 360,
                        maxWidth: "100%",
                        borderRadius: 16,
                        border: "1px solid #e5e7eb",
                        boxShadow:
                            "0 12px 30px rgba(15, 23, 42, 0.12)",
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        gap: 8,
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <button onClick={onDownload}>
                        Download
                    </button>

                    <button onClick={onShare} disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Share"}
                    </button>
                </div>

                {shareUrl && (
                    <div
                        style={{
                            width: "100%",
                            maxWidth: 480,
                            padding: 12,
                            borderRadius: 12,
                            background: "#ffffff",
                            border: "1px solid #eee",
                        }}
                    >
                        <p
                            style={{
                                margin: "0 0 6px",
                                fontWeight: 600,
                                color: "#374151",
                            }}
                        >
                            Share Link
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: 8,
                                flexWrap: "wrap",
                                alignItems: "center",
                            }}
                        >
                            <a
                                href={shareUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    color: "#7c3aed",
                                    wordBreak: "break-all",
                                }}
                            >
                                Open Image
                            </a>

                            <button
                                onClick={onCopyShareUrl}
                                style={{
                                    padding: "6px 10px",
                                }}
                            >
                                Copy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
