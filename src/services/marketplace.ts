import { apiService } from "./api";
import { SERVER_API_BASE_V1 } from "../constants/commonStrings.constant";
import { AxiosPromise } from "axios";

class MarketplaceService {
	getProducts = (): AxiosPromise<any> => {
		return apiService({
			method: "get",
			url: SERVER_API_BASE_V1 + "marketplace?currentPage=1&perPage=20",
		});
	};

	getHighlightProducts = (): AxiosPromise<any> => {
		return apiService({
			method: "get",
			url: SERVER_API_BASE_V1 + "marketplace/highlights",
		});
	};

	purchase = (id: string): AxiosPromise<any> => {
		return apiService({
			method: "post",
			url: SERVER_API_BASE_V1 + `marketplace/${id}/buy`,
		});
	};
}

export const marketplaceService = new MarketplaceService();
