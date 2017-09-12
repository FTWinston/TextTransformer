import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    sort: Parameters.ChoiceParameter;
    direction: Parameters.ChoiceParameter;
}

class Reverse extends Process<IParameters> {
    name = 'Sort';
    description = 'Sort lines by text or length';
    perLine = false;

    createParameters() {
        return {
            sort: new Parameters.ChoiceParameter('Sort by', ['Text', 'Text (ignore case)', 'Line length']),
            direction: new Parameters.ChoiceParameter('Order', ['Ascending', 'Descending']),
        };
    }

    perform(input: string, params: IParameters) {
        let sortFunc: (a: string, b: string) => number;

        switch (params.sort.value) {
            case 'Text':
                sortFunc = (a: string, b: string) => {
                    if (params.direction.value === 'Descending') {
                        let tmp = a;
                        a = b;
                        b = tmp;
                    }
                    if (a < b) {
                        return -1;
                    } else if (b < a) {
                        return 1;
                    } else {
                        return 0;
                    }
                };
                break;
            case 'Text (ignore case)':
                sortFunc = (a: string, b: string) => {
                    if (params.direction.value === 'Descending') {
                        let tmp = a;
                        a = b;
                        b = tmp;
                    }
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a < b) {
                        return -1;
                    } else if (b < a) {
                        return 1;
                    } else {
                        return 0;
                    }
                };
                break;
            case 'Line length':
                sortFunc = (a: string, b: string) => {
                    if (params.direction.value === 'Descending') {
                        let tmp = a;
                        a = b;
                        b = tmp;
                    }
                    if (a.length < b.length) {
                        return -1;
                    } else if (b.length < a.length) {
                        return 1;
                    } else {
                        return 0;
                    }
                };
                break;
            default:
                return input;
        }

        let lines = input.split('\n');
        lines = lines.sort(sortFunc);
        return lines.join('\n');
    }
}

Process.all.push(new Reverse());