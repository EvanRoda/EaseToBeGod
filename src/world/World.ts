import {Point} from "../Utils/Point";
import {Chunk} from "./Chunk";
import {Cell} from "./Cell";

export class World {
    public static CELL_SIZE = 32; // px     Use 2 ^ n for next constants
    public static CHUNK_SIZE = 32; // cells
    public static WORLD_SIZE = 32; // chunks

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

    public getCell(globalX: number, globalY: number): Cell {
        const chunkCoord = new Point(
            Math.floor(globalX / World.CHUNK_SIZE),
            Math.floor(globalY / World.CHUNK_SIZE)
        );

        const local = new Point(
            globalX % World.CHUNK_SIZE,
            globalY % World.CHUNK_SIZE
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