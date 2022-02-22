import { apiService } from "./api";
import { SERVER_API_BASE_V1 } from "../constants/commonStrings.constant";
import { AxiosPromise } from "axios";

class WorkshopService {
	getAll = (): AxiosPromise<any> => {
		return apiService({
			method: "get",
			url: SERVER_API_BASE_V1 + "workshops?currentPage=1&perPage=6",
		});
	};

	getOne = (id: number): AxiosPromise<any> => {
		return apiService({
			method: "get",
			url: SERVER_API_BASE_V1 + "workshops/" + id.toString(),
		});
	};

	getHighlights = (): AxiosPromise<any> => {
		return apiService({
			method: "get",
			url: SERVER_API_BASE_V1 + "workshops/featured",
		});
	};

	submit = (data: any): AxiosPromise<any> => {
		return apiService({
			method: "post",
			url: SERVER_API_BASE_V1 + "workshops",
			data: data,
		});
	};
}

export const workshopService = new WorkshopService();
