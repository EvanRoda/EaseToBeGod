import {Cell} from "./Cell";
import {World} from "./World";
import {Point} from "../Utils/Point";
import {Drawable} from "../drawable/Drawable";

export class Chunk {
    private coords: Point;
    private grid: Cell[];

    constructor(coords: Point) {
        super();
        this.coords = coords;
        this.grid = [];
    }

    public isEmpty(): boolean {
        return this.grid.length === 0;
    }

    public generate(): void {
        for (let i = 0; i < (World.CHUNK_SIZE ** 2); i++) {
            this.grid.push(new Cell());
        }
    }

    private fillGrid(): void {
        for (let i = 0; i < (World.CHUNK_SIZE ** 2); i++) {
            this.grid.push(new Cell());
        }
    }
}