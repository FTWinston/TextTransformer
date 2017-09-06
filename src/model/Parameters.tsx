import * as React from 'react';
import { TextInput } from '../inputs/TextInput';
import { CheckboxInput } from '../inputs/CheckboxInput';

export interface IParameter {
    readonly name: string;
    renderInput(key: number): JSX.Element;
}

abstract class Parameter<T> implements IParameter {
    constructor(public readonly name: string, public value: T) {
        
    }
    
    abstract renderInput(key: number): JSX.Element;
}

export class TextParameter extends Parameter<string> {
    constructor(name: string, readonly singleLine: boolean, defaultValue: string = '') {
        super(name, defaultValue);
    }
    
    renderInput(key: number) {
        return <TextInput key={key} name={this.name} value={this.value} singleLine={this.singleLine} valueChanged={value => this.value = value} />;
    }
}

export class BooleanParameter extends Parameter<boolean> {
    constructor(name: string, defaultValue: boolean = false) {
        super(name, defaultValue);
    }

    renderInput(key: number) {
        return <CheckboxInput key={key} name={this.name} value={this.value} valueChanged={value => this.value = value} />;
    }
}

export class ChoiceParameter extends Parameter<string> {
    constructor(name: string, readonly options: string[]) {
        super(name, options[0]);
    }

    renderInput(key: number) {
        return <div key={key}>yo</div>;
    }
}