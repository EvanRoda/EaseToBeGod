import {Queue} from "./Queue";
import {Point} from "../Utils/Point";
import {WallMap} from "./WallMap";

export class Breadth {
    private front: Queue;
    private pathMap: {[key: string]: Point};

    public makePathMap(wallMap: WallMap, start: Point): void {
        this.front = new Queue();
        this.front.put(start);
        this.pathMap = {};
        this.pathMap[start.toString()] = null;

        while (!this.front.isEmpty()) {
            const current = this.front.get();
            for (const next of wallMap.neighbors(current)) {
                const nextKey = next.toString();
                if (!this.pathMap[nextKey]) {
                    this.front.put(next);
                    this.pathMap[nextKey] = current;
                }
            }
        }
    }

    public getPath(goal: Point, reverse: boolean = false): Point[] {
        let current = goal;
        const path: Point[] = [current];

        while(this.pathMap[current.toString()] !== null) {
            current = this.pathMap[current.toString()];
            path.push(current);
        }

        if (reverse) {
            path.reverse();
        }

        return path;
    }
}