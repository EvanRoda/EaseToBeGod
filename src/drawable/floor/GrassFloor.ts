import {Floor} from "../Floor";
import {World} from "../../world/World";

export class GrassFloor extends Floor {
    constructor() {
        super();

        this.myShowedName = 'Grass';
    }

    protected createSprite(): void {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = 'green';

        ctx.fillRect(0, 0, World.CELL_SIZE, World.CELL_SIZE);
    }
}