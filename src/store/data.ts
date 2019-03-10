import Data from '../classes/Data';

const names: string[] = ['John Doe', 'Jane Doe', 'Max', 'Laura', 'Axel', 'Mike', 'Andy'];

let data: Data[] = [];

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

for(let i = 0; i < 50; ++i) {
    data.push(new Data(names[getRandomInt(0, names.length)], getRandomInt(18, 80)));
}

export default data;
