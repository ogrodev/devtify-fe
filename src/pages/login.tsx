import { Link } from "react-router-dom";
import { routeConfig } from "../routes/routeConfig";

export default function Login() {
	return (
		<div>
			<h1>Login</h1>
			<Link to={routeConfig.home.path}>Go to {routeConfig.home.name}</Link>
		</div>
	);
}
