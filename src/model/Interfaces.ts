export interface INamedItem {
    readonly name: string;
    readonly description: string;
}

export interface ISelectable extends INamedItem {
    makeExecutable(): IExecutable;
    readonly isEditable: boolean;
}

export interface IExecutable extends INamedItem {
    perform(input: string): string;
    readonly selectedItem: ISelectable;
    rawParameters: object;
    perLine: boolean;
}

export interface IProcess extends ISelectable {
    readonly perLine: boolean;
    createParameters(): object;
}

export interface IAction extends IExecutable {
    name: string;
}

export interface IParameter {
    readonly name: string;
    renderInput(key: number): JSX.Element;
}