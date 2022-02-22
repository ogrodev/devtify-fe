import {DateTime} from "luxon";

// Date and time formats can be localized
export const DATE_FORMAT = "D"; // Ex: 12/13/2019
export const TIME_FORMAT = "t"; // Ex: 8:17 AM
export const TIME_DATE_FORMAT = "t D"; // Ex: 8:17 AM 12/13/2019
export const DATE_TIME_FORMAT = "D t"; // Ex: 12/13/2019 8:17 AM
export const DATE_TIME_FULL_FORMAT = "DDDD t"; // Ex: Friday, December 13, 2019 8:17 AM
export const DATE_TIME_FULL_FORMAT_NODAY = "DDD t"; // Ex: December 13, 2019 8:17 AM
export const DATE_FULL_NODAY = "DDD"; // Ex: December 13, 2019

export function formatDate(dateToFormat: string, format: string, showTimeZone: boolean = false): string {
    let dateFromISO: string = DateTime.fromISO(dateToFormat).toFormat(format);
    let dateFromSQL: string = "";
    if (dateFromISO === "Invalid DateTime") {
        dateFromSQL = DateTime.fromSQL(dateToFormat).toFormat(format);
        if (showTimeZone) {
            dateFromSQL = `${dateFromSQL} ${
                new Date(dateToFormat).toLocaleDateString("en-us", {timeZoneName: "short"}).split(" ")[1]
            }`;
        }
        return dateFromSQL;
    }
    if (showTimeZone) {
        dateFromISO = `${dateFromISO} ${
            new Date(dateToFormat).toLocaleDateString("en-us", {timeZoneName: "short"}).split(" ")[1]
        }`;
    }
    return dateFromISO;
}

export function formatDateBuilder(dateToFormat: number, format: string, showTimeZone: boolean = false): string {
    // console.log(dateToFormat)
    if (typeof dateToFormat === "string") {
        dateToFormat = 1639371319470;
    }
    let dateFromISO: string = DateTime.fromMillis(dateToFormat).toFormat(format);

    if (showTimeZone) {
        dateFromISO = `${dateFromISO} ${
            new Date(dateToFormat).toLocaleDateString("en-us", {timeZoneName: "short"}).split(" ")[1]
        }`;
    }
    return dateFromISO;
}

export function SubstractMinutes(date: string, minutes: number) {
    let formatedDate: DateTime = DateTime.fromISO(date);
    return formatedDate.minus({minutes: minutes});
}
