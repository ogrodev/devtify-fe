import React, { Dispatch, Reducer, useReducer } from "react";
import useAppMiddleware from "../hooks/useAppMiddleware";
import { IApp, IWorkshop } from "../interfaces/app.interface";
import { CLEAR_APP, TOGGLE_MODAL } from "../reducers/app.reducer";

export interface IAppContext {
	settings: IApp;
	updateAppSettings: Function;
	clearAppSettings: Function;
	appDispatch: Dispatch<any>;
	toggleModal: Function;
}

const AppStateContext = React.createContext<IAppContext>({
	settings: {
		theme: "light",
		notification: {
			show: false,
		},
		modal: {
			product: false,
		},
		workshops: [],
		products: [],
		highlights: {
			workshop: {} as IWorkshop,
			products: [],
		},
	},
	updateAppSettings: () => {},
	clearAppSettings: () => {},
	appDispatch: () => {},
	toggleModal: () => {},
});

interface IProvider {
	children: React.ReactNode | React.ReactNode[];
	reducer: Reducer<IApp, any>;
	initialState: IApp;
}

export const AppStateProvider = ({ children, reducer, initialState }: IProvider) => {
	const [globalAppState, appDispatch] = useReducer<Reducer<IApp, any>>(reducer, initialState);
	const { fetchWorkshops, fetchHighlightWorkshop, fetchUserInventory, fetchProducts, fetchHighlightProducts, fetchWorkshop } =
		useAppMiddleware();

	const updateAppSettings = (type: string, payload: any) => {
		switch (type) {
			case "FETCH_WORKSHOPS":
				fetchWorkshops(appDispatch);
				break;
			case "FETCH_HIGHLIGHT_WORKSHOP":
				fetchHighlightWorkshop(appDispatch);
				break;
			case "FETCH_USER_INVENTORY":
				fetchUserInventory(appDispatch);
				break;
			case "FETCH_PRODUCTS":
				fetchProducts(appDispatch);
				break;
			case "FETCH_HIGHLIGHT_PRODUCTS":
				fetchHighlightProducts(appDispatch);
				break;
			case "FETCH_WORKSHOP":
				fetchWorkshop(payload, appDispatch);
				break;
			default:
				appDispatch({ type, payload });
				break;
		}
	};

	const clearAppSettings = () => {
		appDispatch({ type: CLEAR_APP });
	};

	const toggleModal = (modalType: string) => {
		appDispatch({ type: TOGGLE_MODAL, modalTrigger: modalType });
	};

	return (
		<AppStateContext.Provider
			value={{ settings: globalAppState, updateAppSettings, clearAppSettings, appDispatch, toggleModal }}
		>
			{children}
		</AppStateContext.Provider>
	);
};

export const AppStateConsumer = AppStateContext.Consumer;

export default AppStateContext;
