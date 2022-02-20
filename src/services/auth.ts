import { apiService } from "./api";
import { SERVER_API_BASE_V1 } from "../constants/commonStrings.constant";
import { AxiosPromise } from "axios";

class AuthService {
	tryLogin(email: string, password: string): AxiosPromise<any> {
		const json = {
			email: email.trim().toLowerCase(),
			password: password,
		};

		return apiService({
			method: "POST",
			url: SERVER_API_BASE_V1 + "login",
			data: json,
		});
	}

	logout(): AxiosPromise<any> {
		return apiService({
			method: "POST",
			url: SERVER_API_BASE_V1 + "logout",
		});
	}

	register(
		name: string,
		email: string,
		job_title: string,
		project_client: string,
		linkedin_url: string,
		password: string,
		password_confirmation: string
	): AxiosPromise<any> {
		const json = {
			name: name.trim(),
			email: email.trim().toLowerCase(),
			job_title: job_title.trim(),
			project_client: project_client.trim(),
			linkedin_url: linkedin_url.trim(),
			password,
			password_confirmation,
		};

		return apiService({
			method: "post",
			url: SERVER_API_BASE_V1 + "signup",
			data: json,
		});
	}

	forgotPassword(email: string): AxiosPromise<any> {
		const json = {
			email: email.trim().toLowerCase(),
		};

		return apiService({
			method: "post",
			url: SERVER_API_BASE_V1 + "forgot-password",
			data: json,
		});
	}
}

export const authService = new AuthService();
