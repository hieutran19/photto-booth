import type { PhotoTemplate } from "../types/template";

export const templates: Record<
    PhotoTemplate,
    {
        bg: string;
        text: string;
        title: string;
        frameSrc?: string;
        previewSlots?: Array<{
            x: number;
            y: number;
            width: number;
            height: number;
        }>;
    }
> = {
    classic: {
        bg: "#ffffff",
        text: "#111111",
        title: "PHOTO BOOTH",
        previewSlots: [
            { x: 0.05, y: 0.20, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.38, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.56, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.74, width: 0.90, height: 0.16 },
        ],
    },
    dark: {
        bg: "#111111",
        text: "#ffffff",
        title: "PHOTO BOOTH",
        previewSlots: [
            { x: 0.05, y: 0.20, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.38, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.56, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.74, width: 0.90, height: 0.16 },
        ],
    },
    polaroid: {
        bg: "#ffffff",
        text: "#111111",
        title: "MEMORIES",
        previewSlots: [
            { x: 0.05, y: 0.20, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.38, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.56, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.74, width: 0.90, height: 0.16 },
        ],
    },
    newspaper: {
        bg: "#f7f2e7",
        text: "#1f1f1f",
        title: "NEWS PAPER",
        frameSrc: "/NewsPaper.png",
        previewSlots: [
            { x: 0.05, y: 0.20, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.38, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.56, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.74, width: 0.90, height: 0.16 },
        ],
    },
    parkbogum: {
        bg: "#faf8f1",
        text: "#102c44",
        title: "PARK BOGUM",
        frameSrc: "/ParkBoGum.png",
        previewSlots: [
            { x: 0.05, y: 0.20, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.38, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.56, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.74, width: 0.90, height: 0.16 },
        ],
    }
};