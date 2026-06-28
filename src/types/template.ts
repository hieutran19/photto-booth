export type PhotoTemplate =
    | "classic"
    | "dark"
    | "polaroid"
    | "newspaper"
    | "parkbogum";

export interface PhotoSlot {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    fit: "cover" | "contain";
    clip: boolean;
}

export interface TemplateLayout {
    frame: {
        width: number;
        height: number;
    };
    slots: PhotoSlot[];
}

export interface FrameOverlayStyle {
    top?: number | string;
    left?: number | string;
    width?: number | string;
    height?: number | string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export interface PreviewSlot {
    x: number;
    y: number;
    width: number;
    height: number;
    top?: number | string;
    left?: number | string;
    slotWidth?: number | string;
    slotHeight?: number | string;
}