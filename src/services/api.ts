import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { EXPIRED_TOKEN_MSG, INVALID_TOKEN_MSG } from "../constants/errorMessages.constant";
import { getAuthHeader } from "../utils/auth.util";

const axiosInstance: AxiosInstance = axios.create();

export const setupInterceptor = (token: string, clearAuthState: Function) => {
	axiosInstance.interceptors.request.use(
		(config: AxiosRequestConfig) =>
			new Promise((resolve) => {
				config.withCredentials = true;
				config.xsrfCookieName = "XSRF-TOKEN";
				config.xsrfHeaderName = "X-XSRF-TOKEN";
				const authHeader = getAuthHeader(token);
				config.headers = {
					...config.headers,
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Cache-Control": "no-cache",
					"Sec-Fetch-Site": "cross-site",
					"Sec-Fetch-Mode": "no-cors",
				};
				if (authHeader) {
					config.headers.Authorization = authHeader;
				}
				resolve(config);
			}),
		(error: AxiosError) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			if (error?.response?.status === 419) {
				axios.get("/csrf-token");
				return axios(error.response.config);
			}
			if (error?.response?.status === 401) {
				return axios(error.response.config);
			} else if (error?.response?.status === 403) {
				return Promise.reject(INVALID_TOKEN_MSG);
			} else {
				return Promise.reject(error);
			}
		}
	);
};

export const apiService = axiosInstance;
