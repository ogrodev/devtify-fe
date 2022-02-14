import { IApp } from "../interfaces/app.interface";

export const UPDATE_APP = "APP/UPDATE";
export const TOGGLE_THEME = "APP/TOGGLE_THEME";
export const CLEAR_APP = "APP/CLEAR";

export const initialAppState: IApp = { theme: "light" } as IApp;

interface IAction {
	type: string;
	payload?: IApp;
}

export const appReducer = (state: IApp = initialAppState, action: IAction) => {
	switch (action.type) {
		case UPDATE_APP:
			return {
				...state,
				...action.payload,
			};

		case TOGGLE_THEME:
			return { ...state, theme: state.theme === "light" ? "dark" : "light" };

		default:
			return state;
	}
};
