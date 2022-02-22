import useAuth from "../../hooks/useAuth";
import styles from "./progress.module.sass";

export default function Progress() {
	const { authState } = useAuth();

	return (
		<div className={styles.container}>
			<h5 className="mb-2">Rewards trail</h5>
			<div className="progress w-100">
				<div
					className="progress-bar"
					role="progressbar"
					style={{ width: `${authState.progression}%`, backgroundColor: "var(--blueBaires)" }}
					aria-valuenow={authState.progression}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					{authState.progression}%
				</div>
			</div>
			<small className="mt-2">
				Win rewards by interacting in the platform, completing profile and buying products!
			</small>
		</div>
	);
}
