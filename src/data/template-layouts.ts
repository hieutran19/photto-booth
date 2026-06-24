import type { PhotoTemplate, TemplateLayout } from "../types/template";

/**
 * Defines the photo slot layouts for each template.
 * Coordinates are in pixels (not percentages).
 * Each slot defines where photos will be placed and cropped.
 */
export const templateLayouts: Record<
    PhotoTemplate,
    TemplateLayout
> = {
    classic: {
        frame: {
            width: 800,
            height: 2100,
        },
        slots: [
            {
                id: 1,
                x: 24,
                y: 280,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 24,
                y: 1320,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 24,
                y: 2360,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 24,
                y: 3400,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
        ],
    },
    dark: {
        frame: {
            width: 800,
            height: 2100,
        },
        slots: [
            {
                id: 1,
                x: 24,
                y: 280,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 24,
                y: 1320,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 24,
                y: 2360,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 24,
                y: 3400,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
        ],
    },
    polaroid: {
        frame: {
            width: 800,
            height: 2100,
        },
        slots: [
            {
                id: 1,
                x: 24,
                y: 280,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 24,
                y: 1320,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 24,
                y: 2360,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 24,
                y: 3400,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
        ],
    },
    newspaper: {
        frame: {
            width: 800,
            height: 2100,
        },
        slots: [
            {
                id: 1,
                x: 24,
                y: 280,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 24,
                y: 1320,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 24,
                y: 2360,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 24,
                y: 3400,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
        ],
    },
    parkbogum: {
        frame: {
            width: 800,
            height: 2100,
        },
        slots: [
            {
                id: 1,
                x: 24,
                y: 280,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 24,
                y: 1320,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 24,
                y: 2360,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 24,
                y: 3400,
                width: 752,
                height: 1000,
                fit: "cover",
                clip: true,
            },
        ],
    },
};
