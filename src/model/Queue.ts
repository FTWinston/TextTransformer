import Action from './Action';

class Queue {
    public actions: Action[] = [];

    perform(input: string) : string {
        let singleValue: string | null = input;
        let lineValues: string[] | null = null;

        for (let action of this.actions) {
            if (action.process.perLine) {
                if (lineValues === null) {
                    lineValues = this.split(singleValue as string);
                    singleValue = null;
                }

                for (let i=0; i<lineValues.length; i++)
                    lineValues[i] = action.process.perform(lineValues[i], action.parameters);
            }
            else {
                if (singleValue === null) {
                    singleValue = this.combine(lineValues as string[]);
                    lineValues = null;
                }

                singleValue = action.process.perform(singleValue, action.parameters)
            }
        }

        if (singleValue === null)
            singleValue = this.combine(lineValues as string[]);

        return singleValue;
    }

    private split(value: string) {
        return value.split(/\n/);
    }

    private combine(values: string[]) {
        return values.join('\n');
    }
}

export default Queue