import {Floor} from "./../drawable/Floor";
import {Stuff} from "./../drawable/Stuff";
import {Creature} from "./../drawable/Creature";
import {Point} from "../Utils/Point";
import {Drawable} from "../drawable/Drawable";
import {LayerTypes} from "../display/LayerTypes";

export class Cell {
    private global: Point;
    private layers: Drawable[];

    constructor(floor: Floor, stuff: Stuff = null) {
        this.initLayers();
        this.layers[LayerTypes.FLOOR] = floor;
        this.layers[LayerTypes.STUFF] = stuff;
    }

    public setGlobal(point: Point): void {
        this.global = point;
    }

    public getLayer(layerType: LayerTypes): Drawable {
        return this.layers[layerType];
    }

    private initLayers(): void {
        this.layers = [];
        this.layers[LayerTypes.FLOOR] = null;
        this.layers[LayerTypes.STUFF] = null;
        this.layers[LayerTypes.CREATURE] = null;
        this.layers[LayerTypes.EFFECT] = null;
    }
}
