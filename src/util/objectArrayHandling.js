/**
 *
 *
 * @param objectArray
 * @param propertyName
 * @param valueContents
 * @returns {*}
 */
const getEntryByPropertyWithValue = (objectArray, propertyName, valueContents) => {
    return objectArray.filter(objectEntry => objectEntry[propertyName] === valueContents)[0];
}

/**
 *
 *
 * @param objectArray
 * @param propertyName
 * @param valueContentsArray
 * @returns {*}
 */
const getEntriesByPropertyWithValues = (objectArray, propertyName, valueContentsArray) => {
    return objectArray.filter(objectEntry => valueContentsArray.includes(objectEntry[propertyName]));
}

/**
 *
 *
 * @param objectArray
 * @param propertyName
 */
const sortByProperty = (objectArray, propertyName) => {
    objectArray.sort((a,b) => (a[propertyName] > b[propertyName]) ? 1 : ((b[propertyName] > a[propertyName]) ? -1 : 0))
}

export {getEntryByPropertyWithValue, getEntriesByPropertyWithValues, sortByProperty}