import {Vector} from "../Utils/Vector";
import {Point} from "../Utils/Point";
import {World} from "../world/World";
import {Bounds} from "../Utils/Bounds";
import {Cell} from "../world/Cell";
import {XY} from "../Utils/XY";

export class Display {
    private container: HTMLElement;
    private world: World;
    private cells: {[stringCoords: string]: Cell};

    private ground: HTMLCanvasElement;
    private stuff: HTMLCanvasElement;
    private effects: HTMLCanvasElement;

    // Display state

    private mySize: Vector;
    private myIntHalfSize: Vector;
    private myPosition: Point;
    private myBounds: Bounds;

    private bindAnimate: FrameRequestCallback;

    constructor(container: HTMLElement, world: World) {
        this.container = container;
        this.world = world;

        this.bindAnimate = this.animate.bind(this);

        this.myPosition = new Point(0, 0);
        this.size = new Vector(
            this.container.offsetWidth,
            this.container.offsetHeight
        );

        this.addCanvas(this.ground);
        this.addCanvas(this.stuff);
        this.addCanvas(this.effects);

        this.bindAnimate(null);
    }

    set position(point: Point) {
        this.myPosition = point;
        this.calcBounds();
    }

    set size(vector: Vector) {
        this.mySize = vector;
        this.calcIntHalfSize();
    }

    set intHalfSize(vector: Vector) {
        this.myIntHalfSize = vector;
        this.calcBounds();
    }

    set bounds(bounds: Bounds) {
        this.myBounds = bounds;
        this.refreshCells();
    }

    public jumpTo(point: Point): void {
        this.position = point;
    }

    private addCanvas(canvas: HTMLCanvasElement): void {
        canvas = document.createElement('canvas');
        canvas.classList.add('absolute');

        canvas.width = this.mySize.x;
        canvas.height = this.mySize.y;

        this.container.appendChild(canvas);
    }

    private calcIntHalfSize(): void {
        this.intHalfSize = this.mySize.div(2).floor();
    }

    private calcBounds() {
        const min = this.myPosition.move(this.myIntHalfSize.div(-World.CELL_SIZE).ceil());
        const max = this.myPosition.move(this.myIntHalfSize.div(World.CELL_SIZE).ceil());

        this.bounds = new Bounds(min, max);
    }

    private refreshCells(): void {
        const newCells = {};

        for (let y = this.myBounds.min.y; y <= this.myBounds.max.y; y++) {
            for (let x = this.myBounds.min.x; x <= this.myBounds.max.x; x++) {
                const str = XY.toStringCoords(x, y);
                if (this.cells[str]) {
                    newCells[str] = this.cells[str];
                    continue;
                }

                newCells[str] = this.world.getCell(x, y);
            }
        }

        this.cells = newCells;
    }

    private animate(timeStamp: number): void {
        requestAnimationFrame(this.bindAnimate);


    }
}
