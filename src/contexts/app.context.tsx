import React, { Dispatch, Reducer, useReducer } from "react";
import useAppMiddleware from "../hooks/useAppMiddleware";
import { IApp, IWorkshop } from "../interfaces/app.interface";
import { CLEAR_APP, TOGGLE_MODAL, UPDATE_WORKSHOP } from "../reducers/app.reducer";

export interface IAppContext {
	settings: IApp;
	updateAppSettings: Function;
	clearAppSettings: Function;
	appDispatch: Dispatch<any>;
	toggleModal: Function;
	toggleLikeWs: Function;
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
		inventory: [],
		highlights: {
			workshop: {} as IWorkshop,
			products: [],
		},
	},
	updateAppSettings: () => {},
	clearAppSettings: () => {},
	appDispatch: () => {},
	toggleModal: () => {},
	toggleLikeWs: () => {},
});

interface IProvider {
	children: React.ReactNode | React.ReactNode[];
	reducer: Reducer<IApp, any>;
	initialState: IApp;
}

export const AppStateProvider = ({ children, reducer, initialState }: IProvider) => {
	const [globalAppState, appDispatch] = useReducer<Reducer<IApp, any>>(reducer, initialState);
	const {
		fetchWorkshops,
		fetchHighlightWorkshop,
		fetchUserInventory,
		fetchProducts,
		fetchHighlightProducts,
		fetchWorkshop,
	} = useAppMiddleware();

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

	const toggleLikeWs = (id: number, user_id: number) => {
		const workshop = globalAppState.workshops?.find((ws: IWorkshop) => ws.id === id);
		if (workshop) {
			if (workshop.likes.find((like) => like.user_id === user_id)) {
				workshop.likes = workshop.likes.filter((like) => like.user_id !== user_id);
			} else {
				workshop.likes.push({
					user_id,
					id: Math.random() * 137,
					workshop_id: id,
				});
			}
			workshop.liked = !workshop.liked;
			appDispatch({ type: UPDATE_WORKSHOP, payload: { workshops: [workshop] } });
		}
	};

	return (
		<AppStateContext.Provider
			value={{
				settings: globalAppState,
				updateAppSettings,
				clearAppSettings,
				appDispatch,
				toggleModal,
				toggleLikeWs,
			}}
		>
			{children}
		</AppStateContext.Provider>
	);
};

export const AppStateConsumer = AppStateContext.Consumer;

export default AppStateContext;
