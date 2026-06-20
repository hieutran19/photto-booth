interface Props {
    photos: string[];
}

export default function PhotoGallery({
    photos,
}: Props) {
    if (!photos.length) return null;

    return (
        <>
            <h3>
                Captured Photos ({photos.length}/4)
            </h3>

            <div
                style={{
                    display: "flex",
                    gap: 12,
                    overflowX: "auto",
                }}
            >
                {photos.map((photo, index) => (
                    <img
                        key={index}
                        src={photo}
                        alt={`photo-${index}`}
                        style={{
                            width: 120,
                            borderRadius: 12,
                        }}
                    />
                ))}
            </div>
        </>
    );
}