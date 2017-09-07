import { IExecutable, ISelectable } from './Interfaces';

export class Queue implements IExecutable, ISelectable {
    actions: IExecutable[] = [];
    description: string = 'A user-created process';
    readonly perLine: boolean = false;
    readonly isEditable: true;
    readonly rawParameters = {};
    readonly selectedItem = this;

    constructor(public name: string = 'New process') {

    }

    makeExecutable() {
        return this;
    }

    perform(input: string): string {
        let singleValue: string | null = input;
        let lineValues: string[] | null = null;

        for (let action of this.actions) {
            if (action.perLine) {
                if (lineValues === null) {
                    lineValues = this.split(singleValue as string);
                    singleValue = null;
                }

                for (let i = 0; i < lineValues.length; i++) {
                    lineValues[i] = action.perform(lineValues[i]);
                }
            } else {
                if (singleValue === null) {
                    singleValue = this.combine(lineValues as string[]);
                    lineValues = null;
                }

                singleValue = action.perform(singleValue);
            }
        }

        if (singleValue === null) {
            singleValue = this.combine(lineValues as string[]);
        }

        return singleValue;
    }

    private split(value: string) {
        return value.split(/\n/);
    }

    private combine(values: string[]) {
        return values.join('\n');
    }
}