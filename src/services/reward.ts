import { apiService } from "./api";
import { SERVER_API_BASE_V1 } from "../constants/commonStrings.constant";
import { AxiosPromise } from "axios";

class RewardService {
	getAll = (): AxiosPromise<any> => {
		return apiService({
			method: "get",
			url: SERVER_API_BASE_V1 + "user/rewards",
		});
	};

	claim = (id: number): AxiosPromise<any> => {
		return apiService({
			method: "post",
			url: SERVER_API_BASE_V1 + `rewards/${id.toString()}/claim`,
		});
	};
}

export const rewardService = new RewardService();
