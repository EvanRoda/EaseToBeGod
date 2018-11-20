import {Vector} from "../Utils/Vector";
import {Point} from "../Utils/Point";
import {World} from "../world/World";
import {Bounds} from "../Utils/Bounds";
import {Cell} from "../world/Cell";
import {XY} from "../Utils/XY";
import {Dom} from "../Utils/Dom";
import {Layer} from "./Layer";
import {LayerTypes} from "./LayerTypes";

export class Display {
    private container: HTMLElement;
    private world: World;
    private cells: {[stringCoords: string]: Cell};

    private real: HTMLCanvasElement;
    private layers: Layer[];

    // Display state

    private mySize: Vector;
    private myIntHalfSize: Vector;
    private myPosition: Point;
    private myBounds: Bounds;

    private bindAnimate: FrameRequestCallback;

    private needRedraw: boolean;

    constructor(container: HTMLElement, world: World) {
        this.container = container;
        this.world = world;
        this.cells = {};

        this.myPosition = new Point(0, 0);
        this.size = new Vector(
            this.container.offsetWidth,
            this.container.offsetHeight
        );

        this.real = Dom.createCanvas(this.mySize);
        this.real.classList.add('absolute');
        this.container.appendChild(this.real);

        this.initLayers();

        this.needRedraw = true;
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
                const normal = World.toNormal(x, y);
                const str = normal.toString();
                const cell = this.cells[str];

                if (cell) {
                    newCells[str] = cell;
                    continue;
                }

                newCells[str] = this.world.getCell(normal);
            }
        }
        console.log(this);
        this.cells = newCells;
    }

    private animate(timeStamp: number): void {
        requestAnimationFrame(this.bindAnimate);

        // if (!this.needRedraw) return;
        // this.needRedraw = false;

        this.drawAll();
        this.drawOnReal();
    }

    private drawOnReal(): void {
        const ctx = this.real.getContext('2d');
        for (const layer of this.layers) {
            layer.draw(ctx);
        }
    }

    private drawAll(): void {
        const halfVector = new Vector(.5, .5);
        const shift = this.myIntHalfSize.sub(Vector.fromPoints(this.myPosition.move(halfVector), this.myBounds.min)
            .mult(World.CELL_SIZE));

        const origin = this.myBounds.min;

        for (const layer of this.layers) {
            layer.clear();
            layer.translate(shift);
        }

        for (let y = this.myBounds.min.y; y <= this.myBounds.max.y; y++) {
            for (let x = this.myBounds.min.x; x <= this.myBounds.max.x; x++) {
                const normal = World.toNormal(x, y);

                const coords = new Point(
                    World.CELL_SIZE * (x - origin.x),
                    World.CELL_SIZE * (y - origin.y)
                );

                const str = normal.toString();
                const cell = this.cells[str];

                for (const layer of this.layers) {
                    layer.drawCell(cell, coords);
                }
            }
        }
    }

    private initLayers(): void {
        this.layers = [
            new Layer(LayerTypes.FLOOR, this.mySize),
            new Layer(LayerTypes.STUFF, this.mySize),
            new Layer(LayerTypes.CREATURE, this.mySize),
            new Layer(LayerTypes.EFFECT, this.mySize)
        ];
    }
}
