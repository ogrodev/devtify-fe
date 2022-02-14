import { Suspense } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { parsedLocalAuth } from "../reducers/auth.reducer";

export default function RequireAuth({ children }: { children: JSX.Element }) {
	let { authState } = useAuth();
	let location = useLocation();

	if (!authState?.authenticated && !parsedLocalAuth?.authenticated) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
