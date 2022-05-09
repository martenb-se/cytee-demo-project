import InvalidArgumentError from "./customErrors/InvalidArgumentError";

/**
 * Retrieve the discount percentage of a price decrease.
 *
 * @example
 * // returns 10
 * getDiscountPercentage(100, 90);
 *
 * // A price increase is not a discount and will always return 0.
 * // returns 0
 * getDiscountPercentage(100, 110);
 *
 * @param previousPrice The previous price before the discount.
 * @param currentPrice The current price after the discount.
 * @returns {number} The discount percentage.
 */
const getDiscountPercentage = (previousPrice, currentPrice) => {
    if (typeof previousPrice !== 'number')
        throw new InvalidArgumentError("Previous price must be a number", "previousPrice");

    if (typeof currentPrice !== 'number')
        throw new InvalidArgumentError("Current price must be a number", "currentPrice");

    let discountPercentage = 0;

    if (currentPrice < previousPrice) {
        discountPercentage = Math.round(100 - ((currentPrice / previousPrice) * 100));
    }

    return discountPercentage;
}

export {getDiscountPercentage}