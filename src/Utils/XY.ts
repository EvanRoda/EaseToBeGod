export class XY {
    public static toStringCoords(x, y): string {
        return `${x},${x}`;
    }

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public toString(): string {
        return XY.toStringCoords(this.x, this.y);
    }
}