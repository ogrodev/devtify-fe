import { IApp, INews, IOpenSourceProject, IWorkshop } from "../interfaces/app.interface";

export const UPDATE_APP = "APP/UPDATE";
export const UPDATE_HIGHLIGHTS = "APP/UPDATE/HIGHLIGHTS";
export const TOGGLE_THEME = "APP/TOGGLE_THEME";
export const TOGGLE_PRODUCT_MODAL = "APP/MODAL/PRODUCT";
export const TOGGLE_WS_MODAL = "APP/MODAL/WORKSHOP";
export const CLEAR_APP = "APP/CLEAR";

export const initialAppState: IApp = sessionStorage.settings
	? JSON.parse(sessionStorage.settings)
	: ({
			theme: "light",
			notification: { show: false },
			modal: {
				product: false,
			},
			workshops: [],
			highlights: {
				workshop: {} as IWorkshop,
			},
	  } as IApp);

interface IAction {
	type: string;
	payload?: IApp | string;
}

export const appReducer = (state: IApp = initialAppState, action: IAction) => {
	switch (action.type) {
		case UPDATE_APP:
			if (typeof action.payload === "string") return state;
			sessionStorage.settings = JSON.stringify({ ...state, ...action.payload });
			return {
				...state,
				...action.payload,
			};

		case UPDATE_HIGHLIGHTS:
			if (typeof action.payload === "string") return state;
			sessionStorage.settings = JSON.stringify({
				...state,
				highlights: {
					...state.highlights,
					...action.payload,
				},
			});
			return {
				...state,
				highlights: {
					...state.highlights,
					...action.payload,
				},
			};

		case TOGGLE_THEME:
			sessionStorage.settings = JSON.stringify({ ...state, theme: state.theme === "light" ? "dark" : "light" });
			return { ...state, theme: state.theme === "light" ? "dark" : "light" };

		case TOGGLE_PRODUCT_MODAL:
			sessionStorage.settings = JSON.stringify({
				...state,
				modal: {
					...state.modal,
					product: !state.modal.product,
				},
			});
			return {
				...state,
				modal: {
					...state.modal,
					product: !state.modal.product,
				},
			};

		case TOGGLE_WS_MODAL:
			sessionStorage.settings = JSON.stringify({
				...state,
				modal: {
					...state.modal,
					workshop: !state.modal.workshop,
				},
			});
			return {
				...state,
				modal: {
					...state.modal,
					workshop: !state.modal.workshop,
				},
			};

		default:
			return state;
	}
};
