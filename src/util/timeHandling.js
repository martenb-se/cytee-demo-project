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
 * Retrieve the number of days between a starting date and an ending date.
 *
 * @example
 * // returns 2
 * getDaysSinceDate("2022-05-30", "2022-06-01");
 *
 * @param {string} startDateTimeStamp The date to count the number of days from.
 * @param {string} endDateTimeStamp The date to count the number of days to.
 * @returns {number} The number of days since the given date.
 */
const getDaysUntilDate = (startDateTimeStamp, endDateTimeStamp) => {
    if (typeof endDateTimeStamp !== 'string')
        throw new InvalidArgumentError("New date timestamp must be a string", "newDateTimeStamp");

    if (typeof startDateTimeStamp !== 'string')
        throw new InvalidArgumentError("Old date timestamp must be a string", "startDateTimeStamp");

    const newDate = new Date(endDateTimeStamp);
    const oldDate = new Date(startDateTimeStamp);

    if (newDate.toString() === 'Invalid Date')
        throw new InvalidArgumentError("New date timestamp was invalid", "newDateTimeStamp");

    if (oldDate.toString() === 'Invalid Date')
        throw new InvalidArgumentError("Old date timestamp was invalid", "startDateTimeStamp");

    if (newDate - oldDate < 0) {
        throw new InvalidArgumentError("Old date timestamp cannot be after today's date", "startDateTimeStamp")
    }

    const timeDifference = newDate - oldDate;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

export {getTodayTimeStamp, getDaysUntilDate}