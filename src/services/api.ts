import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from "axios";
import { EXPIRED_TOKEN_MSG, INVALID_TOKEN_MSG } from "../constants/errorMessages.constant";
import { getAuthHeader } from "../utils/auth.util";

const axiosInstance: AxiosInstance = axios.create();

export const setupInterceptor = (clearAuthState: Function) => {
	axiosInstance.interceptors.request.use(
		(config: AxiosRequestConfig) =>
			new Promise((resolve) => {
				config.withCredentials = true;
				const authHeader = getAuthHeader();
				config.headers = {
					...config.headers,
					Accept: "application/json",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					...(authHeader ? { Authorization: authHeader } : {}),
				};
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
			if (error.response && error.response.status === 419) {
				if (error?.response?.status === 419) {
					axios.get("/csrf-token");
					return axios(error.response.config);
				}
			}
			if (error?.response?.status === 401) {
				clearAuthState();
				return Promise.reject(EXPIRED_TOKEN_MSG);
			} else if (error?.response?.status === 403) {
				return Promise.reject(INVALID_TOKEN_MSG);
			} else {
				return Promise.reject(error);
			}
		}
	);
};

export const apiService = axiosInstance;
