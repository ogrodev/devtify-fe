export const APP_NAME = "Collab by Devtify";
export const API_BASE = "api/";

export const SERVER_ENV: any = {
	development: import.meta.env.VITE_SERVER_LOCAL,
	production: import.meta.env.VITE_SERVER_URL,
};

export const SERVER_API_BASE_V1 = SERVER_ENV[`${import.meta.env.MODE}`] + API_BASE;
