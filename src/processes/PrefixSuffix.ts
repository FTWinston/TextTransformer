import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    prefix: Parameters.TextParameter;
    suffix: Parameters.TextParameter;
}

class PrefixSuffix extends Process<IParameters> {
    name = 'Prefix / Suffix';
    description = 'Add fixed values to the start and/or end of each line';
    perLine = true;

    createParameters() {
        return {
            prefix: new Parameters.TextParameter('Prefix'),
            suffix: new Parameters.TextParameter('Suffix'),
        };
    }

    perform(input: string, params: IParameters) {
        return params.prefix.value + input + params.suffix.value;
    }
}

Process.all.push(new PrefixSuffix());