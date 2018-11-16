import {Drawable} from "./Drawable";

export abstract class Stuff extends Drawable {
    public blocking: boolean;

    constructor() {
        super();
        this.setBlocking();
    }

    protected abstract setBlocking(): void;
}