import InvalidArgumentError from "./customErrors/InvalidArgumentError";

/**
 * Retrieve today's date in the YYYY-MM-DD format.
 *
 * @example
 * // Today's date is 2022-06-01
 * // returns 2022-06-01
 * getCurrentTimeStamp();
 *
 * @returns {string} The timestamp.
 */
const getTodayTimeStamp = () => {
    let dateToday = new Date();
    return dateToday.toISOString().split('T')[0];
}

/**
 * Retrieve the number of days between the given dates.
 *
 * @example
 * // returns 2
 * getDaysSinceDate("2022-06-01", "2022-05-30");
 *
 * @param {string} newDateTimeStamp The date to count the number of days to.
 * @param {string} oldDateTimeStamp The date to count the number of days from.
 * @returns {number} The number of days since the given date.
 */
const getDaysSinceDate = (newDateTimeStamp, oldDateTimeStamp) => {
    if (typeof newDateTimeStamp !== 'string')
        throw new InvalidArgumentError("New date timestamp must be a string", "newDateTimeStamp");

    if (typeof oldDateTimeStamp !== 'string')
        throw new InvalidArgumentError("Old date timestamp must be a string", "oldDateTimeStamp");

    const newDate = new Date(newDateTimeStamp);
    const oldDate = new Date(oldDateTimeStamp);

    if (newDate.toString() === 'Invalid Date')
        throw new InvalidArgumentError("New date timestamp was invalid", "newDateTimeStamp");

    if (oldDate.toString() === 'Invalid Date')
        throw new InvalidArgumentError("Old date timestamp was invalid", "oldDateTimeStamp");

    if (newDate - oldDate < 0) {
        throw new InvalidArgumentError("Old date timestamp cannot be after today's date", "oldDateTimeStamp")
    }

    const timeDifference = newDate - oldDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export {getTodayTimeStamp, getDaysSinceDate}