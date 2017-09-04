class PrefixSuffix extends Process {
    name = 'Prefix / Suffix';
    description = 'Add fixed values to the start and/or end of each line';
    perLine = true;

    parameters = [
        new TextParameter('Prefix'),
        new TextParameter('Suffix'),
    ];

    perform(input: string, params: [string, string]) {
        let prefix = params[0], suffix = params[1];
        return prefix + input + suffix;
    }
}

//ProcessMenu.perLine.add(new PrefixSuffix());