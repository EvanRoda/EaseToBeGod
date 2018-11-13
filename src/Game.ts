import {Display} from "./display/Display";
import {World} from "./world/World";
import {Point} from "./Utils/Point";
import {Rnd} from "./Utils/Rnd";

export class Game {
    private display: Display;
    private world: World;

    constructor() {
        const container = document.getElementById('display');
        this.world = new World();
        this.display = new Display(container);
    }

    public init(): void {
        console.log('Game init');
        const point = new Point(
            Rnd.intInRange(2 * World.WORLD_SIZE * World.CHUNK_SIZE),
            Rnd.intInRange(World.WORLD_SIZE * World.CHUNK_SIZE)
        );
        this.display.jumpTo(point);
    }
}
