import {Vector} from "./Vector";
import {XY} from "./XY";

export class Point extends XY {

    public move(vec: Vector): Point {
        return new Point(this.x + vec.x, this.y + vec.y);
    }
}