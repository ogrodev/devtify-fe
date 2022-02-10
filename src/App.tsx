import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalProvider from "./contexts/globalProvider";
import Dashboard from "./pages/dashboard.protected";
import Home from "./pages/home.page";
import Login from "./pages/login";
import RequireAuth from "./routes/requireAuth";
import { routeConfig } from "./routes/routeConfig";

function App() {
	const [count, setCount] = useState(0);

	return (
		<GlobalProvider>
			<div className="App">
				<Routes>
					<Route path={routeConfig.home.path} element={<Home />} />
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
			</div>
		</GlobalProvider>
	);
}

export default App;
