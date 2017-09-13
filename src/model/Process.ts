import { IProcess } from './Interfaces';
import { Action } from './Action';

export abstract class Process<TParams extends object> implements IProcess {
    static all: IProcess[] = [];

    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly perLine: boolean;
    readonly isEditable = false;

    abstract createParameters(): TParams;

    makeExecutable() {
        return new Action<TParams>(this, this.createParameters());
    }
    
    abstract perform(input: string, params: TParams): string;
}