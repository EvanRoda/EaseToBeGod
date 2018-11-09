export class Queue {
    private list: any;

    constructor() {
        this.list = [];
    }

    public put(e: any): void {
        this.list.push(e);
    }

    public get(): any {
        return this.list.splice(0, 1)[0];
    }

    public isEmpty(): boolean {
        return this.list.length === 0;
    }
}