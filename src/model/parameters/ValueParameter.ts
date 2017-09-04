import Parameter from './Parameter';

abstract class ValueParameter<T> extends Parameter {
    constructor(name: string, readonly defaultValue: T) {
        super(name);
    }
}

export default ValueParameter;