import { getLocalStorage, setLocalStorage } from "../hooks/useLocalStorage";
import { IAuth } from "../interfaces/auth.interface";

export const UPDATE_AUTH = "APP/AUTH/UPDATE";
export const CLEAR_AUTH = "APP/AUTH/CLEAR";

export const parsedLocalAuth: IAuth | null = getLocalStorage("authState") || null;
export const initialAuthState: IAuth = parsedLocalAuth || { authenticated: false };

interface IAction {
	type: string;
	payload?: IAuth;
}

export const authReducer = (state: IAuth = initialAuthState, action: IAction) => {
	switch (action.type) {
		case UPDATE_AUTH:
			setLocalStorage("authState", action.payload);
			return {
				...state,
				...action.payload,
			};

		case CLEAR_AUTH:
			localStorage.removeItem("authState");
			return { authenticated: false };

		default:
			return state;
	}
};
