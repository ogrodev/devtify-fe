import { useEffect } from "react";
import { BsTrophy, BsTrophyFill } from "react-icons/bs";
import MainBanner from "../../components/Banner/mainBanner";
import { Lottie } from "../../components/Lottie/lottie";
import useAuth from "../../hooks/useAuth";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
import { rewardService } from "../../services/reward";
import styles from "./rewards.module.sass";
import coinData from "../../components/Lottie/animations/coin.json";
import GenericButton from "../../components/Buttons/genericButton";
import { AxiosError } from "axios";
import useNotification from "../../hooks/useNotification";
import RewardModal from "../../components/Modal/rewardModal";
import useSettings from "../../hooks/useSettings";

export default function Rewards() {
	const { authState, updateAuthState } = useAuth();
	const { settings, toggleModal } = useSettings();
	const rewardList = authState.rewards || [];
	const notify = useNotification();

	const handleClaim = (rewardId: number, value: number) => {
		rewardService
			.claim(rewardId)
			.then(() => {
				toggleModal("reward" + rewardId.toString());
				updateAuthState(UPDATE_AUTH, {
					rewards: rewardList.map((reward) => {
						if (reward.id === rewardId) {
							return {
								...reward,
								claimed: true,
							};
						}
						return reward;
					}),
					balance: (authState.balance || 0) + value,
				});
			})
			.catch((error: AxiosError) => {
				notify(error.response?.data.message, "Error");
			});
	};

	useEffect(() => {
		rewardService.getAll().then((res) => {
			updateAuthState(UPDATE_AUTH, { rewards: res.data });
		});
	}, []);

	return (
		<div className={`position-relative defaultPadding ${styles.container}`}>
			<MainBanner />
			<div className={styles.innerContainer}>
				<div className={styles.header}>
					<h3>Reward list</h3>
					<hr className={styles.separator} />
				</div>
				<div className={styles.rewards}>
					{rewardList.map((reward) => (
						<div className={styles.reward} key={reward.id}>
							<div className="d-flex align-items-center gap-3">
								<div className={reward.claimed ? styles.claimed : styles.unclaimed}>
									{reward.claimed ? <BsTrophyFill size="2em" /> : <BsTrophy size="2em" />}
								</div>
								<div>
									<div className="fw-semibold">{reward.name}</div>
									<span className="text-muted">{reward.description}</span>
								</div>
							</div>
							<div className="d-flex align-items-center gap-3 flex-wrap flex-lg-nowrap">
								<div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 col-12 col-lg-6">
									<span className="fw-bold">{reward.value} BD</span>
									<Lottie animationData={coinData} width={50} height={50} />
								</div>
								<div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start">
									<GenericButton
										type="button"
										disabled={!reward.claimable || reward.claimed}
										onClick={() => handleClaim(reward.id, reward.value)}
									>
										{reward.claimed ? "Claimed" : "Claim"}
									</GenericButton>
								</div>
							</div>
							{settings.modal["reward" + reward.id.toString()] && (
								<RewardModal id={reward.id} name={reward.name} value={reward.value} />
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
