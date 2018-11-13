export class Rnd {
    public static intInRange(min: number, max?: number): number {
        if (max === undefined) {
            max = min;
            min = 0;
        }

        if (min >= max) {
            throw new Error('Rnd: max must be greater than min!');
        }

        return Math.round((max - min) * Math.random() + min);
    }
}