import {Floor} from "../Floor";
import {World} from "../../world/World";

export class StoneFloor extends Floor {
    constructor() {
        super();

        this.myShowedName = 'Stone floor';
    }

    protected createSprite(): void {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = 'gray';

        ctx.fillRect(0, 0, World.CELL_SIZE, World.CELL_SIZE);
    }
}