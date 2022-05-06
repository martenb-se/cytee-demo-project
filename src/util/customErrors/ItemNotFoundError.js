
class ItemNotFoundError extends Error{
    constructor (message, item) {
        super(message);
        this.name ="ItemNotFoundError";
        this.item = item;
    }
}

export default ItemNotFoundError;