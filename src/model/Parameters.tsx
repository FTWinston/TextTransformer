import * as React from 'react';
import { IParameter } from './Interfaces';
import { TextInput } from '../inputs/TextInput';
import { CheckboxInput } from '../inputs/CheckboxInput';
import { ChoiceInput } from '../inputs/ChoiceInput';

abstract class Parameter<T> implements IParameter {
    constructor(public readonly name: string, public value: T) {
        
    }
    
    abstract renderInput(key: number): JSX.Element;

    toJSON() {
        return this.value;
    }

    fromJSON(value: T) {
        this.value = value;
    }
}

export class TextParameter extends Parameter<string> {
    constructor(name: string, readonly singleLine: boolean, defaultValue: string = '') {
        super(name, defaultValue);
    }
    
    renderInput(key: number) {
        return <TextInput key={key} name={this.name} value={this.value} singleLine={this.singleLine} valueChanged={value => this.value = value} />;
    }
    
    toJSON() {
        return this.value.replace('\t', '\\t').replace('\n', '\\n').replace('\r', '\\r'); // space is the only whitespace allowed inside json
    }

    fromJSON(value: string) {
        this.value = value.replace('\\t', '\t').replace('\n', '\\n').replace('\r', '\\r');
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
        return <ChoiceInput key={key} name={this.name} value={this.value} options={this.options} valueChanged={value => this.value = value} />;
    }
}