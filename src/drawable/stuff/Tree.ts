import {Stuff} from "../Stuff";
import {World} from "../../world/World";
import {Vector} from "../../Utils/Vector";

export class Tree extends Stuff {
    constructor() {
        super();

        this.myShowedName = 'Tree';
    }

    protected setBlocking(): void {
        this.blocking = true;
    }

    protected calcSize(): Vector {
        return new Vector(World.CELL_SIZE, World.CELL_SIZE);
    }

    protected createSprite(): void {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = '#35170c';
        ctx.fillRect(World.CELL_SIZE / 2 - 3, 0, World.CELL_SIZE / 2 + 3, World.CELL_SIZE);
    }
}