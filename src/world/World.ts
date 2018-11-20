import {Point} from "../Utils/Point";
import {Chunk} from "./Chunk";
import {Cell} from "./Cell";

export class World {
    public static CELL_SIZE = 32; // px     Use 2 ^ n for next constants
    public static CHUNK_SIZE = 32; // cells
    public static WORLD_SIZE = 32; // chunks

    public static toNormal(x: number, y: number): Point {
        return new Point(
            x < 0 ? World.WORLD_SIZE * World.CHUNK_SIZE + x : x,
            y < 0 ? World.WORLD_SIZE * World.CHUNK_SIZE + y : y
        );
    }

    private chunks: {[stringCoord: string]: Chunk};

    constructor() {
        this.fillChunks();
    }

    public getChunk(coords: Point): Chunk {
        const stringCoords = coords.toString();
        const chunk = this.chunks[stringCoords];

        if (chunk.isEmpty()) {
            chunk.generate();
        }

        return chunk;
    }

    public getCell(global: Point): Cell {
        const chunkCoord = new Point(
            Math.floor(global.x / World.CHUNK_SIZE),
            Math.floor(global.y / World.CHUNK_SIZE)
        );

        const local = new Point(
            global.x % World.CHUNK_SIZE,
            global.y % World.CHUNK_SIZE
        );

        const chunk = this.getChunk(chunkCoord);
        return chunk.getCell(local);
    }

    private fillChunks(): void {
        this.chunks = {};

        for (let x = 0; x < World.WORLD_SIZE * 2; x++) {
            for (let y = 0; y < World.WORLD_SIZE; y++) {
                const coords = new Point(x, y);
                this.createChunk(coords);
            }
        }
    }

    private createChunk(coords: Point) {
        const stringCoords = coords.toString();
        this.chunks[stringCoords] = new Chunk(coords);
    }
}