import { useEffect, useRef } from "react";

export const useCamera = () => {
    const videoRef =
        useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream =
                    await navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: false,
                    });

                if (videoRef.current) {
                    videoRef.current.srcObject =
                        stream;
                }
            } catch (error) {
                console.error(error);
            }
        };

        startCamera();

        return () => {
            const stream =
                videoRef.current?.srcObject as
                | MediaStream
                | null;

            stream?.getTracks().forEach((track) =>
                track.stop()
            );
        };
    }, []);

    return {
        videoRef,
    };
};