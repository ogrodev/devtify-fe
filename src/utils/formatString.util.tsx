export const CAPITALIZE = "capitalize";
export const LENGTH = "length";

export default function formatString(str: string, type: string, maxLength?: number): string {
    switch (type) {
        case "capitalize":
            return str.charAt(0).toUpperCase() + str.slice(1);
        case "length":
            return str.length > (maxLength! || 500) ? `${str.substring(0, maxLength)}...` : str;
        default:
            return str;
    }
}

export const convertStringFromCamelToSpaces = (camelString: string | null | undefined) => {
    if (!camelString) return "";

    return camelString
        .replace(/([A-Z])/g, " $1")
        .trimStart()
        .trimEnd();
};
