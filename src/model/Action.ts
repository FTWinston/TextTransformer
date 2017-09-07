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

    perform(value: string) {
        return this.process.perform(value, this.parameters);
    }
}