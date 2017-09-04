abstract class Parameter {
    constructor(readonly name: string) { }
    abstract renderInput(key: number): JSX.Element;
}

export default Parameter;