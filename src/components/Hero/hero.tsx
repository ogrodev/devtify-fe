import { RiTimerFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";
import MainBanner from "../Banner/mainBanner";
import GenericButton from "../Buttons/genericButton";
import styles from "./hero.module.sass";
import mockedPost from "./MockedData/mockedPost.json";

export default function HeroSection() {
	const { authState } = useAuth();
	return (
		<>
			<MainBanner />
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
					<div className="text-left w-100 mb-3">
						<h4>Challenge of the day</h4>
					</div>
					<p>
						Post one thing you think every newcomer on BairesDev should know about, in #general on Slack.
						<br />
						<br />
						Come back here and paste your message link to win the reward.
					</p>
					<div className="d-flex justify-content-end mt-auto w-100">
						<GenericButton type="button" variant="cian">
							<span className="text-uppercase">Solve for 10 BD</span>
						</GenericButton>
					</div>
				</div>
			</div>
		</>
	);
}
