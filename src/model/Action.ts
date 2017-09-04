import Process from './Process';

class Action {
    constructor(public readonly process: Process, public parameters: Array<string|boolean>) {

    }
}

export default Action