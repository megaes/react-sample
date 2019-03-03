export const serializeDB = (db) => {
    localStorage.setItem('react-sample-db', JSON.stringify(db));
}

export const deserializeDB = () => {
    let data = localStorage.getItem('react-sample-db');
    if (data) {
        return JSON.parse(data);
    }
    data = require('./data').default;
    serializeDB(data);
    return data;
}

export const updateObjectInArray = (array, index, obj) => {
    const newArray = [...array];
    newArray[index] = obj;
    return newArray;
}