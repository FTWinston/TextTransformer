import * as React from 'react';
import ValueParameter from './ValueParameter';
import ShortTextInput from '../../inputs/ShortTextInput';

class TextParameter extends ValueParameter<string> {
    constructor(name: string, defaultValue: string = '') {
        super(name, defaultValue);
    }
    
    renderInput(key: number) {
        return <ShortTextInput key={key} parameter={this} />;
    }
}

export default TextParameter;