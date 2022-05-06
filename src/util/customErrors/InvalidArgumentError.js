
class InvalidArgumentError extends Error{
    constructor (message, argument) {
        super(message);
        this.name = "InvalidArgumentError"
        this.argument = argument
    }
}

export default InvalidArgumentError;