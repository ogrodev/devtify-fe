import React, { Dispatch, Reducer, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { IAuth } from "../interfaces/auth.interface";
import { CLEAR_AUTH } from "../reducers/auth.reducer";
import { routeConfig } from "../routes/routeConfig";

export interface IAuthContext {
	authState: IAuth;
	updateAuthState: Function;
	clearAuthState: Function;
	authDispatch: Dispatch<any>;
}

const AuthStateContext = React.createContext<IAuthContext>({
	authState: {
		authenticated: false,
	},
	updateAuthState: () => {},
	clearAuthState: () => {},
	authDispatch: () => {},
});

interface IProvider {
	children: React.ReactNode | React.ReactNode[];
	reducer: Reducer<IAuth, any>;
	initialState: IAuth;
}

export const AuthStateProvider = ({ children, reducer, initialState }: IProvider) => {
	const [globalAuthState, authDispatch] = useReducer<Reducer<IAuth, any>>(reducer, initialState);
	const navigate = useNavigate();

	const updateAuthState = (type: string, payload: IAuth) => {
		return authDispatch({ type, payload });
	};

	const clearAuthState = async () => {
		await authDispatch({ type: CLEAR_AUTH });
		navigate(routeConfig.login.path);
	};

	return (
		<AuthStateContext.Provider
			value={{ authState: globalAuthState, updateAuthState, clearAuthState, authDispatch }}
		>
			{children}
		</AuthStateContext.Provider>
	);
};

export const AuthStateConsumer = AuthStateContext.Consumer;

export default AuthStateContext;
