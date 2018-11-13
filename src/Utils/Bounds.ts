import {Point} from "./Point";

export class Bounds {
    private min: Point;
    private max: Point;

    constructor(min: Point, max: Point) {
        this.min = min;
        this.max = max;
    }
}