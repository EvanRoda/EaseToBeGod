import {XY} from "./XY";
import {Point} from "./Point";

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

    public floor(): Vector {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }

    public ceil(): Vector {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }

    public toPoint(): Point {
        return new Point(this.x, this.y);
    }
}