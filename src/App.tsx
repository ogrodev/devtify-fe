import { Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalProvider from "./contexts/globalProvider";
import Dashboard from "./pages/dashboard.protected";
import Login from "./pages/Login/login";
import RequireAuth from "./routes/requireAuth";
import { routeConfig } from "./routes/routeConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/uikit.sass";
import "./styles/inputs.sass";
import "./styles/buttons.sass";
import useSettings from "./hooks/useSettings";

function App() {
	const { settings } = useSettings();
	return (
		<GlobalProvider>
			<main className={`App ${settings.theme}`}>
				<Routes>
					<Route path={routeConfig.login.path} element={<Login />} />

					{/* Protected routes */}
					<Route
						path={routeConfig.dashboard.path}
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
				</Routes>
			</main>
		</GlobalProvider>
	);
}

export default App;
