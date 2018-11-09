
import Display from "rot-js/lib/display/display";
export class Player {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public draw(display: Display): void {
        display.draw(this.x, this.y, '@', '#f00');
    }

    public act(): void {
        Game.
    }
}