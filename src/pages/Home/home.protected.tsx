import styles from "./home.module.sass";
import HeroSection from "../../components/Hero/hero";
import FeaturedProducts from "../../components/Products/featuredProducts";

export default function Home() {
	return (
		<div className={`position-relative text-start defaultPadding pt-5 ${styles.container}`}>
			<HeroSection />
			<FeaturedProducts />
		</div>
	);
}
