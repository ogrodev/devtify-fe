import { Lottie } from "../../components/Lottie/lottie";
import animation from "../../components/Lottie/animations/404.json";
import { useNavigate } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";
import GenericButton from "../../components/Buttons/genericButton";

export default function Page404() {
	const navigate = useNavigate();
	const goToHome = () => {
		navigate(routeConfig.home.path);
	};
	return (
		<div className="fullScreen d-flex flex-column align-items-center justify-content-center">
			<Lottie animationData={animation} width={700} height={400} />
			<GenericButton type="button" variant="gray" onClick={goToHome}>
				Back to home
			</GenericButton>
		</div>
	);
}
