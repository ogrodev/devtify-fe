import { RiTimerFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import GenericButton from "../Buttons/genericButton";
import styles from "./hero.module.sass";
import mockedPost from "./MockedData/mockedPost.json";

export default function HeroSection() {
	const { authState } = useAuth();
	return (
		<>
			<div className={styles.bannerBg} style={{ backgroundImage: `url(/images/app/bg_main.jpg)` }} />
			<div className={styles.welcome}>
				<h2>Hey {authState.name}!</h2>
			</div>
			<div className={styles.heroSection}>
				<div className={styles.heroContentLg}>
					<div className={styles.imgContainer}>
						<div />
						<img src={mockedPost.cover} alt={mockedPost.title} />
					</div>
					<span className={styles.heroBadge}>Post of the week</span>
					<div>
						<span className={styles.heroTitle}>{mockedPost.title}</span>
						<span className={styles.heroAuthor}>By {mockedPost.author}</span>
						<div className="d-flex gap-3 justify-content-end">
							<GenericButton type="button">
								<span className="text-uppercase">Read post</span>
							</GenericButton>
							<GenericButton type="button" variant="cian">
								<span className="text-uppercase">Add new post for 3 BD</span>
							</GenericButton>
						</div>
					</div>
				</div>
				<div className={styles.heroContentSm}>
					<div className={styles.timerIcon}>
						<RiTimerFill size={100} />
					</div>
					<span>Challenge of the day</span>
					<div className="d-flex justify-content-end">
						<GenericButton type="button" variant="cian">
							<span className="text-uppercase">Solve for 10 BD</span>
						</GenericButton>
					</div>
				</div>
			</div>
		</>
	);
}
