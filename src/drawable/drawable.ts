export abstract class Drawable {
    private canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = document.createElement('canvas');
        const size = this.calculateSize();
        this.canvas.width = size;
        this.canvas.height = size;

    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.canvas, 0, 0);
    }

    protected abstract calculateSize(): number;
}