class InvalidArgumentError extends Error{
    /**
     * Error for Invalid Arguments
     *
     * @param message The error message.
     * @param argument The affected argument.
     */
    constructor (message, argument) {
        super(message);
        this.name = "InvalidArgumentError"
        this.argument = argument
    }
}

export default InvalidArgumentError;