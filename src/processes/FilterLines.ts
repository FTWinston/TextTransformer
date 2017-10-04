import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    containing: Parameters.TextParameter;
    ignoreCase: Parameters.BooleanParameter;
    matchWholeLine: Parameters.BooleanParameter;
    useRegularExpressions: Parameters.BooleanParameter;
    leaveBlanks: Parameters.BooleanParameter;
    keep: Parameters.ChoiceParameter;
}

const matchedLines = 'Matching lines only', unmatchedLines = 'Non-matching lines only';

class FilterLines extends Process<IParameters> {
    name = 'Filter lines';
    description = 'Removes lines not containing matching text.';
    perLine = false;

    createParameters() {
        return {
            containing: new Parameters.TextParameter('Containing', true),
            ignoreCase: new Parameters.BooleanParameter('Ignore case', false),
            matchWholeLine: new Parameters.BooleanParameter('Match whole line', false),
            useRegularExpressions: new Parameters.BooleanParameter('Use regular expressions'),
            leaveBlanks: new Parameters.BooleanParameter('Leave blank lines where data is removed', false),
            keep: new Parameters.ChoiceParameter('Keep', [matchedLines, unmatchedLines]),
        };
    }

    perform(input: string, params: IParameters) {
        let find = params.containing.value;

        if (!params.useRegularExpressions.value) {
            find = find
            .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
            .replace('	', '\t');
        }

        if (params.matchWholeLine.value) {
            find = '^' + find + '$';
        }
        
        let findRegex = new RegExp(find, params.ignoreCase.value ? 'i' : '');

        let lines = input.split(/\n/);
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let remove = !findRegex.test(line);
            if (params.keep.value === unmatchedLines) {
                remove = !remove;
            }

            if (remove) {
                if (params.leaveBlanks.value) {
                    lines[i] = '';
                } else {
                    lines.splice(i, 1);
                    i--;
                }
            }
        }

        return lines.join('\n');
    }
}

Process.all.push(new FilterLines());