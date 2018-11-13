import {Floor} from "./../drawable/Floor";
import {Stuff} from "./../drawable/Stuff";
import {Creature} from "./../drawable/Creature";

export class Cell {
    private floor: Floor;
    private stuff: Stuff;
    private creature: Creature;

    constructor() {
        this.floor = new Floor();
        this.stuff = null;
        this.creature = null;
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
