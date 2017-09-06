import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    containing: Parameters.TextParameter;
    ignoreCase: Parameters.BooleanParameter;
    matchWholeLine: Parameters.BooleanParameter;
    useRegularExpressions: Parameters.BooleanParameter;
}

class CountLines extends Process<IParameters> {
    name = 'Count lines';
    description = 'Returns the number of lines, optionally only those containing a matching value.';
    perLine = false;

    createParameters() {
        return {
            containing: new Parameters.TextParameter('Containing', true),
            ignoreCase: new Parameters.BooleanParameter('Ignore case', false),
            matchWholeLine: new Parameters.BooleanParameter('Match whole line', false),
            useRegularExpressions: new Parameters.BooleanParameter('Use regular expressions'),
        };
    }

    perform(input: string, params: IParameters) {
        let findText = params.containing.value;
        let filterLines = findText.length > 0;

        if (!params.useRegularExpressions.value) {
            findText = findText.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        if (params.matchWholeLine.value) {
            findText = '^' + findText + '$';
        }
        
        let findRegex = new RegExp(findText, params.ignoreCase.value ? 'gi' : 'g');

        let num = 0;
        let lines = input.split(/\n/);
        for (let line of lines) {
            if (!filterLines || findRegex.test(line)) {
                num++;
            }
        }

        return num.toString();
    }
}

Process.all.push(new CountLines());