/**
 *
 * @param shoppingCartItems
 * @returns {*}
 */
const calculateTotalPriceOfCart = (shoppingCartItems) => {
    return shoppingCartItems.reduce((accumulatedPrice, itemInCart) => {
        return accumulatedPrice + itemInCart.amount * itemInCart.price;
    }, 0);
}

export {calculateTotalPriceOfCart}