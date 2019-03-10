import Data from '../classes/Data';

export function serializeDB(db: Data[]): void {
    localStorage.setItem('react-sample-db', JSON.stringify(db));
}

export function deserializeDB(): Data[] {
    {
        const data: string|null = localStorage.getItem('react-sample-db');
        if (data) {
            return JSON.parse(data);
        }
    }
    let data: Data[] = require('./data').default;
    serializeDB(data);
    return data;
}

export function updateObjectInArray(array: Data[], index: number, obj: Data): Data[] {
    let newArray: Data[] = [...array];
    newArray[index] = obj;
    return newArray;
}