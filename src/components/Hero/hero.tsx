import { useEffect } from "react";
import { RiTimerFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import { routeConfig } from "../../routes/routeConfig";
import MainBanner from "../Banner/mainBanner";
import GenericButton from "../Buttons/genericButton";
import styles from "./hero.module.sass";

export default function HeroSection() {
	const { settings } = useSettings();
	const highlight = settings?.highlights?.workshop;
	const navigate = useNavigate();

	return (
		<>
			<MainBanner />
			<div className={styles.heroSection}>
				<div className={styles.heroContentLg}>
					<div className={styles.imgContainer}>
						<div />
						<img src={highlight?.thumbnail_url} alt={highlight?.title} />
					</div>
					<span className={styles.heroBadge}>Featured workshop</span>
					<div>
						<span className={styles.heroTitle}>{highlight?.title}</span>
						<span className={styles.heroAuthor}>By {highlight?.user?.name}</span>
						<div className="d-flex gap-3 justify-content-end">
							<GenericButton
								type="button"
								onClick={() =>
									navigate(routeConfig.workshop.path.replace(":id", highlight.id?.toString()!))
								}
							>
								<span className="text-uppercase">See more</span>
							</GenericButton>
							<GenericButton type="button" variant="cian">
								<span className="text-uppercase">Add new workshop for 10 BD</span>
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
