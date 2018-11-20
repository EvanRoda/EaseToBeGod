import {Vector} from "../Utils/Vector";
import {Cell} from "../world/Cell";
import {Point} from "../Utils/Point";
import {Dom} from "../Utils/Dom";
import {LayerTypes} from "./LayerTypes";

export class Layer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private type: LayerTypes;

    constructor(type: LayerTypes, size: Vector) {
        this.type = type;
        this.canvas = Dom.createCanvas(size);
        this.ctx = this.canvas.getContext('2d');
    }

    public translate(shift: Vector): void {
        this.ctx.setTransform(1, 0, 0, 1, shift.x, shift.y)
    }

    public clear(): void {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.canvas, 0, 0);
    }

    public drawCell(cell: Cell, drawPoint: Point): void {
        const cellLayer = cell.getLayer(this.type);

        if (!cellLayer) return;

        this.ctx.save();

        this.ctx.translate(drawPoint.x, drawPoint.y);

        cellLayer.draw(this.ctx);

        this.ctx.restore();
    }
}