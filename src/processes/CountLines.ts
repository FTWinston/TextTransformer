import { Process } from '../model/Process';
// import * as Parameters from '../model/Parameters';

interface IParameters {
}

class CountLines extends Process<IParameters> {
    name = 'Count lines';
    description = 'Returns the number of lines, optionally only those containing a matching value.';
    perLine = false;

    createParameters() {
        return {};
    }

    perform(input: string, params: IParameters) {
        return input.split(/\n/).length.toString();
    }
}

Process.all.push(new CountLines());