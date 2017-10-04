import { IAction } from './Interfaces';
import { Process } from './Process';

export class Action<TParams extends object> implements IAction {
    constructor(private process: Process<TParams>, public parameters: TParams) {
        
    }
    
    get selectedItem() { return this.process; }
    get name() { return this.process.name; }
    get description() { return this.process.description; }
    get perLine() { return this.process.perLine; }
    get rawParameters() { return this.parameters as object; }

    clone() {
        let oldParameters = this.parameters;
        let newParameters = this.process.createParameters();

        for (let param of Object.keys(oldParameters)) {
            newParameters[param].value = oldParameters[param].value;
        }

        return new Action(this.process, newParameters);
    }

    perform(value: string) {
        return this.process.perform(value, this.parameters);
    }
    
    toJSON() {
        return {
            process: this.process.name,
            params: this.parameters,
        };
    }
}