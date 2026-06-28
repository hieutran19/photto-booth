import type { FrameOverlayStyle, PhotoTemplate, PreviewSlot } from "../types/template";

export const templates: Record<
    PhotoTemplate,
    {
        bg: string;
        text: string;
        aspectRatio?: string;
        title: string;
        frameSrc?: string;
        frameOverlay?: FrameOverlayStyle | FrameOverlayStyle[];
        slots?: PreviewSlot[];
    }
> = {
    classic: {
        bg: "#ffffff",
        aspectRatio: "9 / 16",
        text: "#111111",
        title: "PHOTO BOOTH",

    },
    dark: {
        bg: "#111111",
        text: "#ffffff",
        aspectRatio: "9 / 16",
        title: "PHOTO BOOTH",
        slots: [
            { x: 0.05, y: 0.20, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.38, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.56, width: 0.90, height: 0.16 },
            { x: 0.05, y: 0.74, width: 0.90, height: 0.16 },
        ],
    },
    polaroid: {
        bg: "#ffffff",
        aspectRatio: "9 / 16",
        text: "#111111",
        title: "MEMORIES",
        slots: [
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
        aspectRatio: "9 / 16",
        frameSrc: "/NewsPaper.png",
        frameOverlay: [
            {
                top: "0px",
                left: "0%",
                width: "100%",
                height: "600px",
                objectFit: "cover",
            },
            {
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
            {
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
            {
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
        ]
    },
    parkbogum: {
        bg: "#faf8f1",
        text: "#102c44",
        title: "PARK BOGUM",
        aspectRatio: "9 / 16",
        frameSrc: "/ParkBoGum.png",
        frameOverlay: [
            {
                top: "0%",
                left: "0%",
                width: "10%",
                height: "10%",
                objectFit: "cover",
            },
            {
                top: "10%",
                left: "0%",
                width: "100%",
                height: "10%",
                objectFit: "cover",
            },
            {
                top: "20%",
                left: "0%",
                width: "100%",
                height: "20%",
                objectFit: "cover",
            },
            {
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
        ]
    }
};