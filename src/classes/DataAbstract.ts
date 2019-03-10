export default abstract class DataAbstract<T> {

    [key: string]: any;

    get id(): number {
        return this._id;
    }

    private readonly _id: number;

    private static lastID = Date.now();

    constructor() {
        Object.defineProperty(this, '_id', { enumerable: false });

        do {
            this._id = Date.now();
        } while  (this._id === DataAbstract.lastID);

        DataAbstract.lastID = this._id;
    }

    public static props<T>(this: new () => T): {name: string, type: string}[] {
        return Object.entries(new this()).map(entry => {
            return {name: entry[0], type: typeof entry[1]};
        });
    }
}