abstract class Process {
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly perLine: boolean;

    abstract parameters : Parameter[];
    
    abstract perform(input: string, params: Array<string|boolean>) : string;
}