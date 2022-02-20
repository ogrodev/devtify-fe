import MainBanner from "../../components/Banner/mainBanner";
import styles from "./marketplace.module.sass";

export default function Marketplace() {
	return (
		<div className={`position-relative text-start defaultPadding pt-5 ${styles.container}`}>
			<MainBanner />
			<div className={styles.titleContainer}>
				<h2>Marketplace</h2>
			</div>
		</div>
	);
}
