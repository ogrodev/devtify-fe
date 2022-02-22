import { IApp, IWorkshop } from "../interfaces/app.interface";

export const UPDATE_APP = "APP/UPDATE";
export const ADD_WORKSHOP = "APP/WS/ADD";
export const UPDATE_WORKSHOP = "APP/WS/UPDATE";
export const LIKE_WORKSHOP = "APP/WS/LIKE";
export const UNLIKE_WORKSHOP = "APP/WS/UNLIKE";
export const UPDATE_HIGHLIGHTS = "APP/UPDATE/HIGHLIGHTS";
export const TOGGLE_THEME = "APP/TOGGLE_THEME";
export const TOGGLE_MODAL = "APP/MODAL/";
export const TOGGLE_PURCHASE_MODAL = "APP/MODAL/PURCHASE";
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
			products: [],
			inventory: [],
			highlights: {
				workshop: {} as IWorkshop,
				products: [],
			},
	  } as IApp);

interface IAction {
	type: string;
	payload?: IApp;
	modalTrigger?: string;
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

		case ADD_WORKSHOP:
			if (typeof action.payload === "string") return state;
			sessionStorage.settings = JSON.stringify({
				...state,
				workshops: [...state.workshops, ...action.payload?.workshops!],
			});
			return {
				...state,
				workshops: [...state.workshops, ...action.payload?.workshops!],
			};

		case UPDATE_WORKSHOP:
			if (typeof action.payload === "string") return state;
			sessionStorage.settings = JSON.stringify({
				...state,
				workshops: state.workshops.map((workshop) =>
					workshop.id === action.payload?.workshops[0].id ? action.payload?.workshops[0] : workshop
				),
			});
			return {
				...state,
				workshops: state.workshops.map((workshop) =>
					workshop.id === action.payload?.workshops[0].id ? action.payload?.workshops[0] : workshop
				),
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

		case TOGGLE_PURCHASE_MODAL:
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

		case TOGGLE_MODAL:
			sessionStorage.settings = JSON.stringify({
				...state,
				modal: {
					...state.modal,
					[action?.modalTrigger!]: !!!state.modal[action?.modalTrigger!],
				},
			});
			return {
				...state,
				modal: {
					...state.modal,
					[action.modalTrigger!]: !!!state.modal[action.modalTrigger!],
				},
			};

		default:
			return state;
	}
};
