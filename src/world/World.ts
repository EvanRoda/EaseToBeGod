import {Point} from "../Utils/Point";
import {Chunk} from "./Chunk";

export class World {
    public static CELL_SIZE = 32; // px     Use 2 ^ n for next constants
    public static CHUNK_SIZE = 32; // cells
    public static WORLD_SIZE = 32; // chunks

    private chuncks: {[stringCoord: string]: Chunk};

    constructor() {
        this.fillChunks();
    }

    private fillChunks(): void {
        for (let x = 0; x < World.WORLD_SIZE * 2; x++) {
            for (let y = 0; y < World.WORLD_SIZE; y++) {
                const coords = new Point(x, y);
                this.createChunk(coords);
            }
        }

    }

    private createChunk(coords: Point) {
        const stringCoords = coords.toString();
        this.chuncks[stringCoords] = new Chunk(coords);
    }
}