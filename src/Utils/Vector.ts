import {XY} from "./XY";

export class Vector extends XY {
    public div(n: number): Vector {
        return new Vector(this.x / n, this.y / n);
    }
    public mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }
    public sub(vec: Vector): Vector {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }
    public add(vec: Vector): Vector {
        return new Vector(this.x + vec.x, this.y + vec.y);
    }
}