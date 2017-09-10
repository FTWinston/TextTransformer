import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    output: Parameters.ChoiceParameter;
    ignoreCase: Parameters.BooleanParameter;
}

class DistinctLines extends Process<IParameters> {
    name = 'Distinct lines';
    description = 'Detect duplicate lines, leaving only distinct/unique/duplicate depending on selected output option';
    perLine = false;

    createParameters() {
        return {
            output: new Parameters.ChoiceParameter('Output', ['Distinct lines', 'Duplicate lines', 'Unique lines']),
            ignoreCase: new Parameters.BooleanParameter('Ignore case'),
        };
    }

    perform(input: string, params: IParameters) {
        let lines = input.split(/\n/);

        let distinct: { [key: string]: [number, string] } = { };
        for (let i = lines.length - 1; i >= 0; i--) {
            let line = lines[i], matchLine = params.ignoreCase.value ? line.toLowerCase() : line;

            if (distinct.hasOwnProperty(matchLine)) {
                distinct[matchLine][0] ++;
            } else {
                distinct[matchLine] = [1, line];
            }
        }

        let results: string[] = [];

        switch (params.output.value) {
            case 'Distinct lines':
                for (let field in distinct) {
                    if (distinct.hasOwnProperty(field)) {
                        results.push(distinct[field][1]);
                    }
                }
                break;
            case 'Duplicate lines':
                for (let field in distinct) {
                    if (distinct.hasOwnProperty(field)) {
                        let result = distinct[field];
                        if (result[0] > 1) {
                            results.push(result[1]);
                        }
                    }
                }
                break;
            case 'Unique lines':
                for (let field in distinct) {
                    if (distinct.hasOwnProperty(field)) {
                        let result = distinct[field];
                        if (result[0] === 1) {
                            results.push(result[1]);
                        }
                    }
                }
                break;
            default:
                return input;
        }

        return results.join('\n');
    }
}

Process.all.push(new DistinctLines());