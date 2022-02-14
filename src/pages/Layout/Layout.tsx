import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header/header";
import useSettings from "../../hooks/useSettings";

export default function Layout() {
	const location = useLocation();
	const isLogin = location.pathname === "/";
	const { settings } = useSettings();

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
