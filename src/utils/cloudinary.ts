export const uploadToCloudinary = async (
    base64: string
): Promise<string> => {
    const cloudName = "YOUR_CLOUD_NAME";
    const uploadPreset = "YOUR_UPLOAD_PRESET";

    const formData = new FormData();

    formData.append("file", base64);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await res.json();

    return data.secure_url;
};