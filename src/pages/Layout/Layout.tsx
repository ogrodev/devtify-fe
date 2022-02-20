import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/header";
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
import { setupInterceptor } from "../../services/api";

export default function Layout() {
	const location = useLocation();
	const isLogin = location.pathname === "/";
	const { settings } = useSettings();
	const { authState, clearAuthState } = useAuth();

	useEffect(() => {
		setupInterceptor(authState.token || "", clearAuthState);
		// eslint-disable-next-line
	}, []);

	return (
		<div className={`App ${settings.theme}`}>
			{!isLogin && (
				<header className="headerBorder">
					<Header />
				</header>
			)}
			<main>
				<Outlet />
			</main>
		</div>
	);
}
