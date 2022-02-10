import { IAuth } from "../interfaces/auth.interface";

export const UPDATE_AUTH = "APP/AUTH/UPDATE";
export const CLEAR_AUTH = "APP/AUTH/CLEAR";

export const initialAuthState: IAuth = {} as IAuth;

interface IAction {
	type: string;
	payload?: IAuth;
}

export const authReducer = (state: IAuth = initialAuthState, action: IAction) => {
	switch (action.type) {
		case UPDATE_AUTH:
			return {
				...state,
				...action.payload,
			};

		case CLEAR_AUTH:
			return initialAuthState;

		default:
			return state;
	}
};
