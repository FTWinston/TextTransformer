import Parameter from './parameters/Parameter';

abstract class Process {
    static all: Process[] = [];

    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly perLine: boolean;

    abstract parameters: Parameter[];
    
    abstract perform(input: string, params: Array<string|boolean>): string;
}

export default Process;