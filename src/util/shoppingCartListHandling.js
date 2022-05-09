import InvalidArgumentError from "./customErrors/InvalidArgumentError";

/**
 * Calculate and get the total price of all items added to a shopping cart's item list.
 *
 * @example
 * // returns 150
 * const shoppingCart = {
 *      items: [
 *          {name: "Ice Cream", price: 25, amount: 2},
 *          {name: "Coffee",    price: 50, amount: 1},
 *          {name: "Apple",     price: 10, amount: 5}
 *      ]
 * }
 * calculateTotalPriceOfCart(shoppingCart.items);
 *
 * @param {Array<{price: number, amount: number}>} shoppingCartItems The shopping cart items list.
 * @returns {number} The total price of all items in the shopping cart.
 */
const calculateTotalPriceOfCart = (shoppingCartItems) => {
    if (!Array.isArray(shoppingCartItems)) {
        throw new InvalidArgumentError(
            "Shopping cart items must be an array of shopping cart items", "shoppingCartItems");
    }

    return shoppingCartItems.reduce((accumulatedPrice, itemInCart, itemIndex) => {
        if (typeof itemInCart.price !== 'number') {
            throw new InvalidArgumentError(
                "Item at array index #" + itemIndex + " must have property 'price' that is a number",
                "shoppingCartItems");
        }

        if (typeof itemInCart.amount !== 'number') {
            throw new InvalidArgumentError(
                "Item at array index #" + itemIndex + " must have property 'amount' that is a number",
                "shoppingCartItems");
        }

        return accumulatedPrice + itemInCart.amount * itemInCart.price;
    }, 0);
}

export {calculateTotalPriceOfCart}