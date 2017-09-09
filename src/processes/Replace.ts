import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    find: Parameters.TextParameter;
    replace: Parameters.TextParameter;
    ignoreCase: Parameters.BooleanParameter;
    useRegularExpressions: Parameters.BooleanParameter;
}

class Replace extends Process<IParameters> {
    name = 'Replace';
    description = 'Replace all occurances of one value with another value.';
    perLine = false;

    createParameters() {
        return {
            find: new Parameters.TextParameter('Find', false),
            replace: new Parameters.TextParameter('Replace', false),
            ignoreCase: new Parameters.BooleanParameter('Ignore case'),
            useRegularExpressions: new Parameters.BooleanParameter('Use regular expressions'),
        };
    }

    perform(input: string, params: IParameters) {
        let find = params.find.value;
        let replace = params.replace.value;

        if (!params.useRegularExpressions.value) {
            find = find
            .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
            .replace('	', '\t');
        }

        let findRegex = new RegExp(find, params.ignoreCase.value ? 'gi' : 'g');
        return input.replace(findRegex, replace);
    }
}

Process.all.push(new Replace());