import {Stuff} from "../Stuff";
import {World} from "../../world/World";
import {Vector} from "../../Utils/Vector";

export class Stone extends Stuff {
    constructor() {
        super();

        this.myShowedName = 'Stone';
    }

    protected setBlocking(): void {
        this.blocking = true;
    }

    protected calcSize(): Vector {
        return new Vector(World.CELL_SIZE, World.CELL_SIZE * 1.25);
    }

    protected createSprite(): void {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = '#cccccc';
        ctx.fillRect(0, 0, World.CELL_SIZE, World.CELL_SIZE);

        ctx.fillStyle = '#dddddd';
        ctx.fillRect(0, World.CELL_SIZE, World.CELL_SIZE, this.size.y);
    }
}