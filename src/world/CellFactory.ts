import {Cell} from "./Cell";
import {GrassFloor} from "../drawable/floor/GrassFloor";
import {StoneFloor} from "../drawable/floor/StoneFloor";
import {Stone} from "../drawable/stuff/Stone";
import {Tree} from "../drawable/stuff/Tree";
import {Rnd} from "../Utils/Rnd";

export class CellFactory {
    public static grass(): Cell {
        return new Cell(new GrassFloor());
    }

    public static stone(): Cell {
        return new Cell(new StoneFloor(), new Stone());
    }

    public static tree(): Cell {
        return new Cell(new GrassFloor(), new Tree());
    }

    public static randomCell(): Cell {
        const w = Rnd.intInRange(100);

        if (w < 10) {
            return CellFactory.stone();
        } else if (w < 30) {
            return CellFactory.tree();
        } else {
            return CellFactory.grass();
        }
    }
}