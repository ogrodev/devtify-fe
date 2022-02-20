import { getLocalStorage } from "../hooks/useLocalStorage";

export function getAuthHeader(storedToken: string) {
	if (storedToken) {
		return `Bearer ${storedToken}`;
	}
	let token: string = "";

	if (localStorage.authState?.includes("token")) {
		token = getLocalStorage("authState")?.token;
	} else if (sessionStorage.authState) {
		token = JSON.parse(sessionStorage.authState).token;
	}

	if (token && token !== "") {
		return "Bearer " + token;
	} else {
		return "";
	}
}
