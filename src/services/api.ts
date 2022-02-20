import { EXPIRED_TOKEN_MSG, INVALID_TOKEN_MSG } from "../constants/errorMessages.constant";
import { getAuthHeader } from "../utils/auth";

export function apiService(options: any) {
	const { method, url, data, headers } = options;

	const authHeader: string = getAuthHeader();

	const fetchOptions: RequestInit = {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
			...(authHeader ? { Authorization: authHeader } : {}),
		},
	};

	if (data) {
		fetchOptions.body = JSON.stringify(data);
	}

	return fetch(url, fetchOptions)
		.then((response) => {
			if (response.status === 401) {
				throw new Error(INVALID_TOKEN_MSG);
			} else if (response.status === 403) {
				throw new Error(EXPIRED_TOKEN_MSG);
			} else if (response.status !== 200) {
				throw new Error(response.statusText);
			}

			return response.json();
		})
		.catch((error) => {
			throw error;
		});
}
