import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    match: Parameters.TextParameter;
    matchNumber: Parameters.NumericParameter;
    numToCut: Parameters.NumericParameter;
    removeBefore: Parameters.BooleanParameter;
    removeAfter: Parameters.BooleanParameter;
    ignoreCase: Parameters.BooleanParameter;
//    useRegularExpressions: Parameters.BooleanParameter;
}

class Truncate extends Process<IParameters> {
    name = 'Truncate';
    description = `Removes characters before/after a given string on each line.
Leave "number to cut" blank to cut all.
Use a negative "match number" to count from the end of the line.`;
    perLine = true;

    createParameters() {
        return {
            match: new Parameters.TextParameter('Match', true),
            matchNumber: new Parameters.NumericParameter('Match Number', 1),
            numToCut: new Parameters.NumericParameter('Number to Cut'),
            removeBefore: new Parameters.BooleanParameter('Remove text before match', true),
            removeAfter: new Parameters.BooleanParameter('Remove text after match'),
            ignoreCase: new Parameters.BooleanParameter('Ignore case'),
//            useRegularExpressions: new Parameters.BooleanParameter('Use regular expressions'),
        };
    }

    perform(input: string, params: IParameters) {
        let matchNum = params.matchNumber.value;

        let matchText = params.match.value;
        if (matchText === '' || matchNum === undefined || matchNum === 0) {
            return input;
        }

        let matchPos = this.findMatch(input, matchText, matchNum, params.ignoreCase.value/*, params.useRegularExpressions.value*/);

        if (matchPos === -1) {
            return params.removeBefore.value ? '' : input; // if match is not found, remove whole line if removing before the match
        }

        if (params.removeAfter.value) {
            input = input.substr(0, matchPos + matchText.length);
        }

        if (params.removeBefore.value) {
            input = input.substr(matchPos);
        }

        return input;
    }

    private findMatch(input: string, match: string, matchNum: number, ignoreCase: boolean/*, useRegex: boolean*/) {
        let startPos: number;
        let run = 1;

        if (matchNum > 0) {
            startPos = 0;

            do {
                startPos = input.indexOf(match, startPos + match.length);
                if (startPos === -1) {
                    return -1;
                }
            } while (run++ < matchNum);
        } else {
            matchNum = -matchNum;
            startPos = input.length;
            
            do {
                startPos = input.lastIndexOf(match, startPos);
                if (startPos === -1) {
                    return -1;
                }
            } while (run++ < matchNum);
        }

        return startPos;
    }
}

Process.all.push(new Truncate());