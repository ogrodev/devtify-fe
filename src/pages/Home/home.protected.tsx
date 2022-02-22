import styles from "./home.module.sass";
import HeroSection from "../../components/Hero/hero";
import FeaturedProducts from "../../components/Products/featuredProducts";
import Progress from "../../components/Progress/progress";
import useAuth from "../../hooks/useAuth";

export default function Home() {
	const { authState } = useAuth();
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
