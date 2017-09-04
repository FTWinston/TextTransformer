import * as React from 'react';
import ValueParameter from './ValueParameter';

class BooleanParameter extends ValueParameter<boolean> {
    constructor(name: string, defaultValue: boolean = false) {
        super(name, defaultValue);
    }

    renderInput(key: number) {
        return <div key={key}>yo</div>;
    }
}

export default BooleanParameter;