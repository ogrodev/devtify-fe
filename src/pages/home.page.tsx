import { Link } from "react-router-dom";
import { routeConfig } from "../routes/routeConfig";

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Link to={routeConfig.dashboard.path}>Go to {routeConfig.dashboard.name}</Link>
		</div>
	);
}
