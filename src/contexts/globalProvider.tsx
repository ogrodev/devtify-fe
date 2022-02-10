import useAuth from "../hooks/useAuth";
import { authReducer, initialAuthState } from "../reducers/auth.reducer";
import { AuthStateProvider } from "./auth.context";

interface IProps {
	children: React.ReactNode | React.ReactNode[];
}

export default function GlobalProvider(props: IProps) {
	return (
		<>
			<AuthStateProvider reducer={authReducer} initialState={initialAuthState}>
				{props.children}
			</AuthStateProvider>
		</>
	);
}
