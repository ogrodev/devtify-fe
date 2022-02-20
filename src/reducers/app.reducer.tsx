import { IApp } from "../interfaces/app.interface";

export const UPDATE_APP = "APP/UPDATE";
export const TOGGLE_THEME = "APP/TOGGLE_THEME";
export const TOGGLE_PRODUCT_MODAL = "APP/MODAL/PRODUCT";
export const CLEAR_APP = "APP/CLEAR";

export const initialAppState: IApp = {
	theme: "light",
	notification: { show: false },
	modal: {
		product: false,
	},
} as IApp;

interface IAction {
	type: string;
	payload?: IApp | string;
}

export const appReducer = (state: IApp = initialAppState, action: IAction) => {
	switch (action.type) {
		case UPDATE_APP:
			if (typeof action.payload === "string") return state;
			return {
				...state,
				...action.payload,
			};

		case TOGGLE_THEME:
			return { ...state, theme: state.theme === "light" ? "dark" : "light" };

		case TOGGLE_PRODUCT_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					product: !state.modal.product,
				},
			};

		default:
			return state;
	}
};
