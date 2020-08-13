export const validateEmail = (email: string): Boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateArgs = (args, rules): string[] => {
    const invalidArgs: string[] = []
    Object.keys(args).forEach(arg => {
        if (!rules[arg](args[arg])) {
            invalidArgs.push(arg);
        }
    })
    return invalidArgs;
}