import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GlobalProvider from "./contexts/globalProvider";
import Login from "./pages/Login/login";
import RequireAuth from "./routes/requireAuth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/uikit.sass";
import "./styles/inputs.sass";
import "./styles/buttons.sass";
import Layout from "./pages/Layout/Layout";
import Page404 from "./pages/404/404";
import Home from "./pages/Home/home.protected";
import NotificationToast from "./components/Notification/notification";

const Marketplace = React.lazy(() => import("./pages/Marketplace/marketplace"));

function App() {
	return (
		<GlobalProvider>
			<Routes>
				{/* Protected routes */}
				<Route path="/" element={<Layout />}>
					<Route index element={<Login />} />
					<Route
						path="home"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route
						path="marketplace"
						element={
							<RequireAuth>
								<Marketplace />
							</RequireAuth>
						}
					/>
				</Route>
				<Route path="/*" element={<Page404 />} />
			</Routes>
			<NotificationToast />
		</GlobalProvider>
	);
}

export default App;
