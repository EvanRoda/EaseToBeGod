import {Vector} from "./Vector";
export class Dom {
    public static createCanvas(size: Vector): HTMLCanvasElement {
        const canvas = document.createElement('canvas');

        canvas.width = size.x;
        canvas.height = size.y;

        return canvas;
    }


}