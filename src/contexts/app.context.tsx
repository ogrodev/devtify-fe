import React, { Dispatch, Reducer, useReducer } from "react";
import useAppMiddleware from "../hooks/useAppMiddleware";
import { IApp, INews, IOpenSourceProject, IWorkshop } from "../interfaces/app.interface";
import { CLEAR_APP } from "../reducers/app.reducer";

export interface IAppContext {
	settings: IApp;
	updateAppSettings: Function;
	clearAppSettings: Function;
	appDispatch: Dispatch<any>;
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
		highlights: {
			workshop: {} as IWorkshop,
		},
	},
	updateAppSettings: () => {},
	clearAppSettings: () => {},
	appDispatch: () => {},
});

interface IProvider {
	children: React.ReactNode | React.ReactNode[];
	reducer: Reducer<IApp, any>;
	initialState: IApp;
}

export const AppStateProvider = ({ children, reducer, initialState }: IProvider) => {
	const [globalAppState, appDispatch] = useReducer<Reducer<IApp, any>>(reducer, initialState);
	const { fetchWorkshops, fetchHighlightWorkshop } = useAppMiddleware();

	const updateAppSettings = (type: string, payload: IApp) => {
		switch (type) {
			case "FETCH_WORKSHOPS":
				fetchWorkshops(appDispatch);
				break;
			case "FETCH_HIGHLIGHT_WORKSHOP":
				fetchHighlightWorkshop(appDispatch);
				break;
			default:
				appDispatch({ type, payload });
				break;
		}
	};

	const clearAppSettings = () => {
		appDispatch({ type: CLEAR_APP });
	};

	return (
		<AppStateContext.Provider
			value={{ settings: globalAppState, updateAppSettings, clearAppSettings, appDispatch }}
		>
			{children}
		</AppStateContext.Provider>
	);
};

export const AppStateConsumer = AppStateContext.Consumer;

export default AppStateContext;
