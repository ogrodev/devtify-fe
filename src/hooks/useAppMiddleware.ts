import { Dispatch } from "react";
import { UPDATE_APP, UPDATE_HIGHLIGHTS } from "../reducers/app.reducer";
import { marketplaceService } from "../services/marketplace";
import { workshopService } from "../services/workshop";

export default function useAppMiddleware() {
	const fetchWorkshops = (appDispatch: Dispatch<any>) => {
		workshopService.getAll().then((response) => {
			appDispatch({ type: UPDATE_APP, payload: { workshops: response.data.items } });
		});
	};

	const fetchHighlightWorkshop = (appDispatch: Dispatch<any>) => {
		workshopService.getHighlights().then((response) => {
			appDispatch({ type: UPDATE_HIGHLIGHTS, payload: { workshop: response.data![0] } });
		});
	};

	const fetchProducts = (appDispatch: Dispatch<any>) => {
		marketplaceService.getProducts().then((response) => {
			appDispatch({ type: UPDATE_APP, payload: { products: response.data.items } });
		});
	};

	const fetchHighlightProducts = (appDispatch: Dispatch<any>) => {
		marketplaceService.getHighlightProducts().then((response) => {
			appDispatch({ type: UPDATE_HIGHLIGHTS, payload: { products: response.data } });
		});
	};

	return { fetchWorkshops, fetchHighlightWorkshop, fetchProducts, fetchHighlightProducts };
}
