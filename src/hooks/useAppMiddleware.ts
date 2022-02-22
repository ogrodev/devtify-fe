import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { IWorkshop } from "../interfaces/app.interface";
import { ADD_WORKSHOP, UPDATE_APP, UPDATE_HIGHLIGHTS } from "../reducers/app.reducer";
import { marketplaceService } from "../services/marketplace";
import { workshopService } from "../services/workshop";

export default function useAppMiddleware() {
	const fetchWorkshops = (appDispatch: Dispatch<any>) => {
		workshopService.getAll().then((response) => {
			appDispatch({ type: UPDATE_APP, payload: { workshops: response.data.items } });
		});
	};

	const fetchWorkshop = (id: number, appDispatch: Dispatch<any>) => {
		workshopService.getOne(id).then((response) => {
			appDispatch({ type: ADD_WORKSHOP, payload: { workshops: [response.data] } });
		});
	};

	const fetchHighlightWorkshop = (appDispatch: Dispatch<any>) => {
		workshopService.getHighlights().then((response: AxiosResponse<IWorkshop[]>) => {
			appDispatch({
				type: UPDATE_HIGHLIGHTS,
				payload: { workshop: response.data.find((ws) => ws.id === 21) },
			});
		});
	};

	const fetchUserInventory = (appDispatch: Dispatch<any>) => {
		marketplaceService.getInventory().then((response) => {
			appDispatch({ type: UPDATE_APP, payload: { products: response.data.items } });
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

	return { fetchWorkshops, fetchHighlightWorkshop, fetchUserInventory, fetchProducts, fetchHighlightProducts, fetchWorkshop };
}
