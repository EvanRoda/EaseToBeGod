import {Vector} from "../Utils/Vector";
import {Point} from "../Utils/Point";
import {World} from "../world/World";
import {Bounds} from "../Utils/Bounds";

export class Display {
    private container: HTMLElement;
    private world: World;

    private position: Point;
    private bounds: Bounds;

    private ground: HTMLCanvasElement;
    private stuff: HTMLCanvasElement;
    private effects: HTMLCanvasElement;

    private size: Vector;

    constructor(container: HTMLElement, world: World) {
        this.container = container;
        this.world = world;
        this.size = new Vector(
            this.container.offsetWidth,
            this.container.offsetHeight
        );

        this.addCanvas(this.ground);
        this.addCanvas(this.stuff);
        this.addCanvas(this.effects);
    }

    public jumpTo(point: Point): void {
        this.position = point;
        this.recalculation();

    }

    private addCanvas(canvas: HTMLCanvasElement): void {
        canvas = document.createElement('canvas');
        canvas.classList.add('absolute');

        canvas.width = this.size.x;
        canvas.height = this.size.y;

        this.container.appendChild(canvas);
    }

    private recalculation(): void {

    }
}
