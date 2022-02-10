import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { routeConfig } from "./routeConfig";

export default function RequireAuth({ children }: { children: JSX.Element }) {
	let { authState } = useAuth();
	let location = useLocation();

	if (!authState.authenticated) {
		return <Navigate to={routeConfig.login.path} state={{ from: location }} replace />;
	}

	return children;
}
