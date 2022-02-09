import { IAuth } from "../interfaces/auth.interface";

export const UPDATE_AUTH = "APP/AUTH/UPDATE";
export const CLEAR_AUTH = "APP/AUTH/CLEAR";

export const initialCompanyState: IAuth = {} as IAuth;

interface IAction {
	type: string;
	payload?: IAuth;
}

export const companyReducer = (state: IAuth = initialCompanyState, action: IAction) => {
	switch (action.type) {
		case UPDATE_AUTH:
			return {
				...state,
				...action.payload,
			};

		case CLEAR_AUTH:
			return initialCompanyState;

		default:
			return state;
	}
};
