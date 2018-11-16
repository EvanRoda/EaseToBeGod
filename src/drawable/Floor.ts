import {Drawable} from "./Drawable";
import {Vector} from "../Utils/Vector";
import {World} from "../world/World";

export abstract class Floor extends Drawable {
    protected calcSize(): Vector {
        return new Vector(World.CELL_SIZE, World.CELL_SIZE);
    }
}