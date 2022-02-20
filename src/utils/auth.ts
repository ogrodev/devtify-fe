import { getLocalStorage } from "../hooks/useLocalStorage";

export function getAuthHeader() {
	let token: string = "";

	if (localStorage.authState?.includes("access_token")) {
		token = getLocalStorage("authState")?.access_token;
	}

	if (token && token !== "") {
		return "Bearer " + token;
	} else {
		return "";
	}
}
