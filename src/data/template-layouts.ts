import type { PhotoTemplate, TemplateLayout } from "../types/template";
///  ảnh Photo Strip
/**
 * Defines the photo slot layouts for each template.
 * Coordinates are in pixels (not percentages).
 * Each slot defines where photos will be placed and cropped.
 */
export const templateLayouts: Record<
    PhotoTemplate,
    TemplateLayout
> = {

    ///x: 40 nghĩa là ô ảnh bắt đầu cách trái 40px.
    //y: 80 nghĩa là ô ảnh bắt đầu cách trên 80px.
    //width: 820 nghĩa là ô ảnh rộng 820px.
    //height: 560 nghĩa là ô ảnh cao 560px.
    classic: {
        frame: {
            width: 900,
            height: 2700,
        },
        slots: [
            {
                id: 1,
                x: 10,
                y: 200,
                width: 750,
                height: 460,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 120,
                y: 720,
                width: 750,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 40,
                y: 1360,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 40,
                y: 2000,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
        ],
    },
    dark: {
        frame: {
            width: 900,
            height: 2700,
        },
        slots: [
            {
                id: 1,
                x: 40,
                y: 80,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 40,
                y: 720,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 40,
                y: 1360,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 40,
                y: 2000,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
        ],
    },
    polaroid: {
        frame: {
            width: 900,
            height: 2700,
        },
        slots: [
            {
                id: 1,
                x: 40,
                y: 80,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 40,
                y: 720,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 40,
                y: 1360,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 40,
                y: 2000,
                width: 820,
                height: 560,
                fit: "cover",
                clip: true,
            },
        ],
    },
    newspaper: {
        frame: {
            width: 900,
            height: 2700,
        },
        slots: [
            {
                id: 1,
                x: 245,
                y: 335,
                width: 600,
                height: 400,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 245,
                y: 755,
                width: 600,
                height: 400,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 245,
                y: 1175,
                width: 600,
                height: 400,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 245,
                y: 1600,
                width: 600,
                height: 400,
                fit: "cover",
                clip: true,
            },
        ],
    },
    parkbogum: {
        frame: {
            width: 900,
            height: 2700,
        },
        slots: [
            {
                id: 1,
                x: 15,
                y: 60,
                width: 830,
                height: 580,
                fit: "cover",
                clip: true,
            },
            {
                id: 2,
                x: 15,
                y: 690,
                width: 830,
                height: 580,
                fit: "cover",
                clip: true,
            },
            {
                id: 3,
                x: 15,
                y: 1315,
                width: 830,
                height: 580,
                fit: "cover",
                clip: true,
            },
            {
                id: 4,
                x: 15,
                y: 1942,
                width: 830,
                height: 580,
                fit: "cover",
                clip: true,
            },
        ],
    },
};
