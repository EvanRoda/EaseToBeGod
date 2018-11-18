import {Point} from "./Point";

export class Bounds {
    public min: Point;
    public max: Point;

    constructor(min: Point, max: Point) {
        this.min = min;
        this.max = max;
    }
}