import styles from "./home.module.sass";
import HeroSection from "../../components/Hero/hero";
import FeaturedProducts from "../../components/Products/featuredProducts";
import Progress from "../../components/Progress/progress";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";

export default function Home() {
	const { authState } = useAuth();
	const { updateAppSettings } = useSettings();

	useEffect(() => {
		updateAppSettings("FETCH_HIGHLIGHT_WORKSHOP");
		// eslint-disable-next-line
	}, []);
	return (
		<div className={`position-relative text-start defaultPadding pt-5 ${styles.container}`}>
			<div className="d-flex align-items-center justify-content-between">
				<div className={styles.welcome}>
					<h2>Hey {authState.name}!</h2>
				</div>
				<Progress />
			</div>
			<HeroSection />
			<FeaturedProducts />
		</div>
	);
}
