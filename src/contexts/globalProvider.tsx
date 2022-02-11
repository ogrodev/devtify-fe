import { appReducer, initialAppState } from "../reducers/app.reducer";
import { authReducer, initialAuthState } from "../reducers/auth.reducer";
import { AuthStateProvider } from "./auth.context";
import { AppStateProvider } from "./app.context";

interface IProps {
	children: React.ReactNode | React.ReactNode[];
}

export default function GlobalProvider(props: IProps) {
	return (
		<>
			<AppStateProvider reducer={appReducer} initialState={initialAppState}>
				<AuthStateProvider reducer={authReducer} initialState={initialAuthState}>
					{props.children}
				</AuthStateProvider>
			</AppStateProvider>
		</>
	);
}
