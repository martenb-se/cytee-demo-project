import InvalidArgumentError from "./customErrors/InvalidArgumentError";

/**
 * In an array of objects, find an object where the given property have the given value.
 *
 * @example
 * // returns {name: "Coffee", price: 50}
 * const itemList = [
 *      {name: "Ice Cream", price: 25},
 *      {name: "Coffee", price: 50},
 *      {name: "Apple", price: 10}
 * ]
 * getEntryByPropertyWithValue(itemList, "name", "Coffee");
 *
 * @param {Array<{}>} objectArray The array of objects to search in.
 * @param {string} propertyName The name of the property to match a value against.
 * @param {*} valueSearch The desired value to find within a given object's property.
 * @returns {{}} The object if matched, otherwise 'undefined' is returned.
 */
const getEntryByPropertyWithValue = (objectArray, propertyName, valueSearch) => {
    if (!Array.isArray(objectArray) || typeof objectArray[0] !== 'object') {
        throw new InvalidArgumentError("The object array must be an array of objects.", "objectArray");
    }

    if (typeof propertyName !== 'string')
        throw new InvalidArgumentError("The sought after object's property name must be a string", "propertyName");

    return objectArray.filter(objectEntry => objectEntry[propertyName] === valueSearch)[0];
}

/**
 * In an array of objects, find all objects with the named property containing any of the given values.
 *
 * @example
 * // returns [
 * //   {name: "Ice Cream", price: 25},
 * //   {name: "Apple", price: 10}
 * // ]
 * const itemList = [
 *      {name: "Ice Cream", price: 25},
 *      {name: "Coffee", price: 50},
 *      {name: "Apple", price: 10}
 * ]
 * getEntriesByPropertyWithValues(itemList, "price", [25, 10]);
 *
 * @param {Array<{}>} objectArray The array of objects to search in.
 * @param {string} propertyName The name of the property to match a values against.
 * @param {Array<*>} valueSearchArray The desired values to find within a given object's property.
 * @returns {Array<{}>} A list of any matched objects.
 */
const getEntriesByPropertyWithValues = (objectArray, propertyName, valueSearchArray) => {
    if (!Array.isArray(objectArray) || typeof objectArray[0] !== 'object') {
        throw new InvalidArgumentError("The object array must be an array of objects.", "objectArray");
    }

    if (typeof propertyName !== 'string')
        throw new InvalidArgumentError("The sought after object's property name must be a string", "propertyName");

    if (!Array.isArray(valueSearchArray))
        throw new InvalidArgumentError("The array of search values must be an array", "valueSearchArray");

    return objectArray.filter(objectEntry => valueSearchArray.includes(objectEntry[propertyName]));
}

/**
 * Alters the given array to be sorted by the named property in ascending order.
 * Comparison of values uses the build in JavaScript function.
 * Read more here: https://tc39.es/ecma262/#sec-abstract-relational-comparison
 *
 * @example
 * // itemList becomes [
 * //   {name: "Apple", price: 10},
 * //   {name: "Coffee", price: 50},
 * //   {name: "Ice Cream", price: 25}
 * // ]
 * const itemList = [
 *      {name: "Ice Cream", price: 25},
 *      {name: "Coffee", price: 50},
 *      {name: "Apple", price: 10}
 * ]
 * sortByProperty(itemList, "name");
 *
 * @example
 * // itemList becomes [
 * //   {name: "Apple", price: 10},
 * //   {name: "Ice Cream", price: 25},
 * //   {name: "Coffee", price: 50}
 * // ]
 * const itemList = [
 *      {name: "Ice Cream", price: 25},
 *      {name: "Coffee", price: 50},
 *      {name: "Apple", price: 10}
 * ]
 * sortByProperty(itemList, "price");
 *
 * @param {Array<{}>} objectArray The array of objects to sort.
 * @param {string} propertyName The name of the property to use when comparing each object.
 * @returns Nothing. The function alters the given array.
 */
const sortByProperty = (objectArray, propertyName) => {
    if (!Array.isArray(objectArray) || typeof objectArray[0] !== 'object') {
        throw new InvalidArgumentError("The object array must be an array of objects.", "objectArray");
    }

    if (typeof propertyName !== 'string')
        throw new InvalidArgumentError("The sought after object's property name must be a string", "propertyName");

    objectArray.sort((a,b) => (a[propertyName] > b[propertyName]) ? 1 : ((b[propertyName] > a[propertyName]) ? -1 : 0))
}

export {getEntryByPropertyWithValue, getEntriesByPropertyWithValues, sortByProperty}