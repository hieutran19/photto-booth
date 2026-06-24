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