import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';
let esrever = require('esrever');

interface IParameters {
    mode: Parameters.ChoiceParameter;
}

class Reverse extends Process<IParameters> {
    name = 'Reverse';
    description = 'Reverse the whole text, the line order, or individual lines';
    perLine = false;

    createParameters() {
        return {
            mode: new Parameters.ChoiceParameter('Reverse', ['Whole text', 'Line order', 'Individual lines']),
        };
    }

    perform(input: string, params: IParameters) {
        switch (params.mode.value) {
            case 'Whole text':
                return esrever.reverse(input);
            case 'Line order':
                let inLines = input.split(/\n/);
                let outLines: string[] = [];
                for (let i = inLines.length - 1; i >= 0; i--) {
                    outLines.push(inLines[i]);
                }
                return outLines.join('\n');
            case 'Individual lines':
                let lines = input.split(/\n/);
                for (let i = lines.length - 1; i >= 0; i--) {
                    lines[i] = esrever.reverse(lines[i]);
                }
                return lines.join('\n');
            default:
                return input;
        }
    }
}

Process.all.push(new Reverse());