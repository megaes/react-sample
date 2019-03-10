import DataAbstract from './DataAbstract';

export default class Data extends DataAbstract<Data> {

    constructor(public name: string = '', public age: number = -1) {
        super();
    }

}
