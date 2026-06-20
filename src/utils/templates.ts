import type { PhotoTemplate } from "../types/template";

export const templates: Record<
    PhotoTemplate,
    {
        bg: string;
        text: string;
        title: string;
    }
> = {
    classic: {
        bg: "#ffffff",
        text: "#111111",
        title: "PHOTO BOOTH",
    },
    dark: {
        bg: "#111111",
        text: "#ffffff",
        title: "PHOTO BOOTH",
    },
    polaroid: {
        bg: "#ffffff",
        text: "#111111",
        title: "MEMORIES",
    },
};