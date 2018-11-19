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
        this.cells = {};

        this.myPosition = new Point(0, 0);
        this.size = new Vector(
            this.container.offsetWidth,
            this.container.offsetHeight
        );

        this.ground = this.addCanvas();
        this.stuff = this.addCanvas();
        this.effects = this.addCanvas();

        this.bindAnimate = this.animate.bind(this);
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

    private addCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');
        canvas.classList.add('absolute');

        canvas.width = this.mySize.x;
        canvas.height = this.mySize.y;

        this.container.appendChild(canvas);

        return canvas;
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
        const newCells: {[stringCoords: string]: Cell} = {};

        for (let y = this.myBounds.min.y; y <= this.myBounds.max.y; y++) {
            for (let x = this.myBounds.min.x; x <= this.myBounds.max.x; x++) {
                const normal = new Point(
                    x < 0 ? World.WORLD_SIZE * World.CHUNK_SIZE + x : x,
                    y < 0 ? World.WORLD_SIZE * World.CHUNK_SIZE + y : y
                );

                const str = normal.toString();
                if (this.cells[str]) {
                    newCells[str] = this.cells[str];
                    continue;
                }

                newCells[str] = this.world.getCell(normal);
            }
        }

        this.cells = newCells;
    }

    private animate(timeStamp: number): void {
        requestAnimationFrame(this.bindAnimate);

        this.drawAll();
    }

    private drawAll(): void {
        const ground = this.ground.getContext('2d');
        const stuff = this.stuff.getContext('2d');
        const halfVector = new Vector(.5, .5);
        const shift = this.myIntHalfSize.sub(Vector.fromPoints(this.myPosition.move(halfVector), this.myBounds.min)
            .mult(World.CELL_SIZE));

        const origin = this.myBounds.min;

        ground.setTransform(1, 0, 0, 1, shift.x, shift.y);
        stuff.setTransform(1, 0, 0, 1, shift.x, shift.y);

        for (let y = this.myBounds.min.y; y <= this.myBounds.max.y; y++) {
            for (let x = this.myBounds.min.x; x <= this.myBounds.max.x; x++) {
                ground.save();
                stuff.save();
                ground.translate(World.CELL_SIZE * (x - origin.x), World.CELL_SIZE * (y - origin.y));
                stuff.translate(World.CELL_SIZE * (x - origin.x), World.CELL_SIZE * (y - origin.y));

                const normal = new Point(
                    x < 0 ? World.WORLD_SIZE * World.CHUNK_SIZE + x : x,
                    y < 0 ? World.WORLD_SIZE * World.CHUNK_SIZE + y : y
                );

                const str = normal.toString();
                this.cells[str].draw(ground, stuff);

                ground.restore();
                stuff.restore();
            }
        }
    }
}
