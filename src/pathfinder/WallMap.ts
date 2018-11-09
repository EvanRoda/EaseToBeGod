import {Point} from "../Utils/Point";
import {Vector} from "../Utils/Vector";

// grid[x][y]
// wall = false

export class WallMap {
    private addresses: Vector[];
    private grid: boolean[][];

    constructor(grid: boolean[][]) {
        this.grid = grid;
        this.addresses = [
            new Vector(0, -1),
            new Vector(1, 0),
            new Vector(0, 1),
            new Vector(-1, 0),
        ]
    }

    neighbors(point: Point): Point[] {
        const neigs: Point[] = [];
        for (const dir of this.addresses) {
            const neig = point.move(dir);
            if (this.grid[neig.x][neig.y]) {
                neigs.push(neig);
            }
        }

        return neigs;
    }
}