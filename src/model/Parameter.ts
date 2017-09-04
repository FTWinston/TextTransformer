abstract class Parameter {
    constructor(readonly name: string) { }
}

abstract class ValueParameter<T> extends Parameter {
    constructor(name: string, readonly defaultValue: T) {
        super(name);
    }
}

class TextParameter extends ValueParameter<string> {
    constructor(name: string, defaultValue: string = '') {
        super(name, defaultValue);
    }
}

class BooleanParameter extends ValueParameter<boolean> {
    constructor(name: string, defaultValue: boolean = false) {
        super(name, defaultValue);
    }
}

class ChoiceParameter extends ValueParameter<string> {
    constructor(name: string, readonly options: string[]) {
        super(name, options[0]);
    }
}
