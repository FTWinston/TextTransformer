import Process from '../model/Process';
import TextParameter from '../model/parameters/TextParameter';
import BooleanParameter from '../model/parameters/BooleanParameter';

class Replace extends Process {
    name = 'Replace';
    description = 'Replace all occurances of one value with another value.';
    perLine = false;

    parameters = [
        new TextParameter('Find'),
        new TextParameter('Replace'),
        new BooleanParameter('Ignore case'),
        new BooleanParameter('Use regular expressions'),
    ];

    perform(input: string, params: [string, string, boolean, boolean]) {
        let find = params[0], replace = params[1];
        let ignoreCase = params[2], useRegex = params[3];

        if (!useRegex) {
            find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            replace = replace.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }
        
        let findRegex = new RegExp(find, ignoreCase ? 'gi' : 'g');
        return input.replace(findRegex, replace);
    }

    static doNothing() {}
}

Process.all.push(new Replace());
export default Replace;