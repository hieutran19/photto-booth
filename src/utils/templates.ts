import type { FrameOverlayStyle, PhotoTemplate, PreviewSlot } from "../types/template";

export const templates: Record<
    PhotoTemplate,
    {
        bg: string;
        text: string;
        aspectRatio?: string;
        title: string;
        frame?: {
            width: number;
            height: number;
        };
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
        frame: { width: 900, height: 2700 },
        slots: [
            { x: 10, y: 200, width: 750, height: 460 },
            { x: 120, y: 720, width: 750, height: 560 },
            { x: 40, y: 1360, width: 820, height: 560 },
            { x: 40, y: 2000, width: 820, height: 560 },
        ],
    },
    dark: {
        bg: "#111111",
        text: "#ffffff",
        aspectRatio: "9 / 16",
        title: "PHOTO BOOTH",
        frame: { width: 900, height: 2700 },
        slots: [
            { x: 40, y: 80, width: 820, height: 560 },
            { x: 40, y: 720, width: 820, height: 560 },
            { x: 40, y: 1360, width: 820, height: 560 },
            { x: 40, y: 2000, width: 820, height: 560 },
        ],
    },
    polaroid: {
        bg: "#ffffff",
        aspectRatio: "9 / 16",
        text: "#111111",
        title: "MEMORIES",
        frame: { width: 900, height: 2700 },
        slots: [
            { x: 40, y: 80, width: 820, height: 560 },
            { x: 40, y: 720, width: 820, height: 560 },
            { x: 40, y: 1360, width: 820, height: 560 },
            { x: 40, y: 2000, width: 820, height: 560 },
        ],
    },
    newspaper: {
        bg: "#f7f2e7",
        text: "#1f1f1f",
        title: "NEWS PAPER",
        aspectRatio: "9 / 16",
        frame: { width: 900, height: 2700 },
        slots: [
            { x: 245, y: 335, width: 600, height: 400 },
            { x: 245, y: 755, width: 600, height: 400 },
            { x: 245, y: 1175, width: 600, height: 400 },
            { x: 245, y: 1600, width: 600, height: 400 },
        ],
        frameSrc: "/NewsPaper.png",
        frameOverlay: [
            {
                top: "0px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
            {
                top: "0px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
            {
                top: "0px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
            {
                top: "0px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
        ],
    },
    parkbogum: {
        bg: "#faf8f1",
        text: "#102c44",
        title: "PARK BOGUM",
        aspectRatio: "9 / 16",
        frame: { width: 900, height: 2700 },
        slots: [
            { x: 15, y: 60, width: 830, height: 580 },
            { x: 15, y: 690, width: 830, height: 580 },
            { x: 15, y: 1315, width: 830, height: 580 },
            { x: 15, y: 1942, width: 830, height: 580 },
        ],
        frameSrc: "/ParkBoGum.png",
        frameOverlay: [
            {
                top: "0px",
                left: "0px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            },
            {
                top: "-100px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
            {
                top: "0px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
            {
                top: "0px",
                left: "0px",
                width: "900px",
                height: "2700px",
                objectFit: "cover",
            },
        ],
    },
};