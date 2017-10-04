import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    position: Parameters.NumericParameter;
    length: Parameters.NumericParameter;
    keep: Parameters.ChoiceParameter;
}

const keepSpecified = 'Keep specified range', removeSpecified = 'Remove specified range';

class Substring extends Process<IParameters> {
    name = 'Substring';
    description = 'Removes characters from each line. Position is zero-based, use negative numbers to count from the end of the line.';
    perLine = true;

    createParameters() {
        return {
            position: new Parameters.NumericParameter('Position'),
            length: new Parameters.NumericParameter('Length'),
            keep: new Parameters.ChoiceParameter('Output', [keepSpecified, removeSpecified]),
        };
    }

    perform(input: string, params: IParameters) {
        let start = params.position.value;
        let length = params.length.value;

        if (start === undefined) {
            return input;
        }

        if (start < 0) {
            start = input.length + start;
            
            if (start < 0) {
                if (length !== undefined) {
                    length += start;
                }
                start = 0;
            }
        }

        if (length !== undefined && (start + length > input.length || length < 0)) {
            length = undefined;
        }

        if (params.keep.value === keepSpecified) {
            return input.substr(start, length);
        } else if (length === undefined) {
            return input.substr(0, start);
        } else {
            return input.substr(0, start) + input.substr(start + length);
        }
    }
}

Process.all.push(new Substring());