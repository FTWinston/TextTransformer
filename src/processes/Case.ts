import { Process } from '../model/Process';
import * as Parameters from '../model/Parameters';

interface IParameters {
    case: Parameters.ChoiceParameter;
    ignoreWords: Parameters.TextParameter;
}

const upper = 'Upper case', lower = 'Lower case', sentence = 'Sentence case';

class Case extends Process<IParameters> {
    name = 'Case';
    description = 'Convert text to upper or lower case';
    perLine = false;

    createParameters() {
        return {
            case: new Parameters.ChoiceParameter('Convert to', [upper, lower, sentence]),
            ignoreWords: new Parameters.TextParameter('Ignore words', true, 'a an and as at but by for from in into is near nor of on onto or the to with'),
        };
    }

    perform(input: string, params: IParameters) {
        let ignoreWords = params.ignoreWords.value.trim();

        if (params.case.value !== sentence && ignoreWords.length === 0) {
            if (params.case.value === upper) {
                return input.toUpperCase();
            } else if (params.case.value === lower) {
                return input.toLowerCase();
            }
        }

        let ignoreWordMap: { [key: string]: boolean } = {};
        for (let word of ignoreWords.toLowerCase().split(/\s+/g)) {
            ignoreWordMap[word] = true;
        }

        let replaceFunction: (word: string) => string;
        switch (params.case.value) {
            case upper:
                replaceFunction = (word: string) => word.toUpperCase(); break;
            case lower:
                replaceFunction = (word: string) => word.toLowerCase(); break;
            case sentence:
                replaceFunction = (word: string) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(); break;
            default:
                return input;
        }

        return input.replace(/\w*/g, (word: string) => {
            if (ignoreWordMap[word.toLowerCase()] === true) {
                return word;
            } else {
                return replaceFunction(word);
            }
        });
    }
}

Process.all.push(new Case());