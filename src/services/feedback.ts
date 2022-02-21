import { apiService } from "./api";
import { SERVER_API_BASE_V1 } from "../constants/commonStrings.constant";
import { AxiosPromise } from "axios";

class FeedbackService {
	send = (feedback: string): AxiosPromise<any> => {
		const json = {
			feedback,
		};
		return apiService({
			method: "post",
			url: SERVER_API_BASE_V1 + "feedback/send",
			data: json,
		});
	};
}

export const feedbackService = new FeedbackService();
