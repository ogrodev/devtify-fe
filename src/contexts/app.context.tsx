import React, { Dispatch, Reducer, useReducer } from "react";
import { IApp } from "../interfaces/app.interface";
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

	const updateAppSettings = (type: string, payload: IApp) => {
		return appDispatch({ type, payload });
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
