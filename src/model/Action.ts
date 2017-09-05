import { IProcess, Process } from './Process';

export interface IAction {
    name: string;
    perLine: boolean;
    process: IProcess;
    rawParameters: object;
    perform(value: string): string;
}

export class Action<TParams extends object> implements IAction {
    constructor(readonly _process: Process<TParams>, public parameters: TParams) {
        
    }
    
    get name() { return this.process.name; }
    get perLine() { return this.process.perLine; }
    get process() { return this._process; }
    get rawParameters() { return this.parameters as object; }

    perform(value: string) {
        return this.process.perform(value, this.parameters);
    }
}