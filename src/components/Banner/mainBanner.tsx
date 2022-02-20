import styles from "./mainBanner.module.sass";

export default function MainBanner() {
	return <div className={styles.bannerBg} style={{ backgroundImage: `url(/images/app/bg_main.jpg)` }} />;
}
