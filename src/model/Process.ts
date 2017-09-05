import { IAction, Action } from './Action';

export interface IProcess {
    readonly name: string;
    readonly description: string;
    readonly perLine: boolean;

    createNewAction(): IAction;
}

export abstract class Process<TParams extends object> implements IProcess {
    static all: IProcess[] = [];

    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly perLine: boolean;

    abstract createParameters(): TParams;

    createNewAction() {
        return new Action<TParams>(this, this.createParameters());
    }
    
    abstract perform(input: string, params: TParams): string;
}