import {Cell} from "./Cell";
import {World} from "./World";
import {Point} from "../Utils/Point";
import {Drawable} from "../drawable/Drawable";
import {CellFactory} from "./CellFactory";

export class Chunk {
    private coords: Point;
    private grid: Cell[];

    constructor(coords: Point) {
        this.coords = coords;
        this.grid = [];
    }

    public isEmpty(): boolean {
        return this.grid.length === 0;
    }

    public generate(): void {
        for (let i = 0; i < (World.CHUNK_SIZE ** 2); i++) {
            const cell = CellFactory.randomCell();

            cell.setGlobal(new Point(
                this.coords.x * World.CHUNK_SIZE + i % World.CHUNK_SIZE,
                this.coords.y * World.CHUNK_SIZE + Math.floor(i / World.CHUNK_SIZE)
            ));

            this.grid.push(cell);
        }
    }

    public getCell(coords: Point): Cell {
        return this.grid[World.CHUNK_SIZE * coords.y + coords.x];
    }
}