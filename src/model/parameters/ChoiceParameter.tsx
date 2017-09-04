import * as React from 'react';
import ValueParameter from './ValueParameter';

class ChoiceParameter extends ValueParameter<string> {
    constructor(name: string, readonly options: string[]) {
        super(name, options[0]);
    }

    renderInput(key: number) {
        return <div key={key}>yo</div>;
    }
}

export default ChoiceParameter