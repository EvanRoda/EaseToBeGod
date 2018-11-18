import {Floor} from "./../drawable/Floor";
import {Stuff} from "./../drawable/Stuff";
import {Creature} from "./../drawable/Creature";
import {Point} from "../Utils/Point";

export class Cell {
    private global: Point;
    private floor: Floor;
    private stuff: Stuff;
    private creature: Creature;

    constructor(floor: Floor, stuff: Stuff = null) {
        this.floor = floor;
        this.stuff = stuff;
        this.creature = null;
    }

    public setGlobal(point: Point): void {
        this.global = point;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.floor.draw(ctx);

        if (this.stuff) {
            this.stuff.draw(ctx);
        }

        if (this.creature) {
            this.creature.draw(ctx);
        }
    }
}
