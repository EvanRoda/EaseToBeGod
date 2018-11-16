import {World} from "../world/World";
import {Vector} from "../Utils/Vector";

export abstract class Drawable {
    protected myShowedName: string;
    protected canvas: HTMLCanvasElement;
    protected size: Vector;

    constructor() {
        this.canvas = document.createElement('canvas');

        this.size = this.calcSize();
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;

        this.myShowedName = 'UNNAMED';

        this.createSprite();
    }

    get showedName() {
        return this.myShowedName;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.canvas, 0, 0);
    }

    protected abstract createSprite(): void;
    protected abstract calcSize(): Vector;
}