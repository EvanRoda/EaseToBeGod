import Display from "rot-js/lib/display/display";
import Digger from "rot-js/lib/map/digger";
import RNG from "rot-js/lib/rng";
import {Player} from "./Player";
import Engine from "rot-js/lib/engine";
import {Simple} from "rot-js/lib/scheduler/simple";

export class Game {
    private display: Display;
    private map: any;
    private player: Player;
    private engine: any;

    constructor() {
        this.display = new Display();
        this.map = {};
    }

    public init(): void {
        console.log('Game init');
        document.body.appendChild(this.display.getContainer());
        this.generateMap();

        const scheduler = new Simple();
        scheduler.add(this.player, true);
        this.engine = new Engine(scheduler);
        this.engine.start();
    }

    private generateMap(): void {
        const digger = new Digger();
        const freeCells: string[] = [];

        const digCallback = (x: number, y: number, value: number) => {
            if (value) { return; } /* do not store walls */

            var key = x+","+y;
            freeCells.push(key);
            this.map[key] = ".";
        };
        digger.create(digCallback);

        this.generateBoxes(freeCells);
        this.createPlayer(freeCells);
        this.drawWholeMap();
        this.player.draw(this.display);
    }

    private drawWholeMap() {
        const keys = Object.keys(this.map);
        for (const key of keys) {
            const parts = key.split(",");
            const x = parseInt(parts[0]);
            const y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }

    private generateBoxes(freeCells: string[]) {
        for (var i = 0; i < 10; i++) {
            var index = Math.floor(RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            this.map[key] = "*";
        }
    };

    private createPlayer(freeCells: string[]): void {
        const index = Math.floor(RNG.getUniform() * freeCells.length);
        const key = freeCells.splice(index, 1)[0];
        const parts = key.split(",");
        const x = parseInt(parts[0]);
        const y = parseInt(parts[1]);
        this.player = new Player(x, y);
    }
}
