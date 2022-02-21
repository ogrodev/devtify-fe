import GenericModal from "./genericModal";
import styles from "./buyModal.module.sass";
import { Lottie } from "../Lottie/lottie";
import coinData from "../Lottie/animations/coin.json";
import confirmationData from "../Lottie/animations/confirmation.json";
import useAuth from "../../hooks/useAuth";
import GenericButton from "../Buttons/genericButton";
import { useState } from "react";
import { marketplaceService } from "../../services/marketplace";
import useNotification from "../../hooks/useNotification";
import { AxiosError } from "axios";
import useSettings from "../../hooks/useSettings";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
interface IProps {
	id: number;
	name: string;
	price: number;
}

export default function BuyModal(props: IProps) {
	const [purchasing, setPurchasing] = useState(false);
	const [purchased, setPurchased] = useState(false);

	const { authState, updateAuthState } = useAuth();
	const { toggleModal } = useSettings();
	const notify = useNotification();

	const handlePurchase = () => {
		if (!authState.balance) return;
		setPurchasing(true);
		marketplaceService
			.purchase(props.id.toString())
			.then(() => {
				setPurchasing(false);
				setPurchased(true);
				updateAuthState(UPDATE_AUTH, { balance: authState.balance! - props.price });
			})
			.catch((error: AxiosError) => {
				setPurchasing(false);
				notify(error.message, "Error");
			});
	};

	const closeModal = () => {
		toggleModal("purchase" + props.id);
	};

	return (
		<GenericModal modalType={"purchase" + props.id} title="Marketplace purchase">
			{purchased ? (
				<div className="d-flex align-items-center justify-content-center flex-column">
					<Lottie animationData={confirmationData} width={250} height={250} />
					<h6 className="text-center">
						Congratulations! <br />
						You purchased: <em className="text-muted">{props.name}</em>
					</h6>
					<GenericButton type="button" className="mt-4 mb-5 w-25" onClick={closeModal}>
						Close
					</GenericButton>
				</div>
			) : (
				<div className="d-flex gap-4">
					<div className={`${styles.blueColumn} col-3`} />
					<div className={styles.content}>
						<div className="d-flex w-100 gap-3">
							<div className="col-4">
								<span className="fw-bold">You selected:</span>
							</div>
							<div className={styles.contentInfo}>
								<span className="d-block secondaryText">{props.name}</span>
								<span className="d-flex w-100 secondaryText align-items-center">
									<Lottie animationData={coinData} width={30} height={30} />
									{props.price} BD
								</span>
							</div>
						</div>
						<div className="d-flex w-100 gap-3 mt-4">
							<div className="col-4">
								<span className="fw-bold">You currently have:</span>
							</div>
							<div className={styles.contentInfo}>
								<span className="d-flex w-100 secondaryText align-items-center">
									<Lottie animationData={coinData} width={30} height={30} />
									{authState.balance || 0} BD
								</span>
							</div>
						</div>
						<hr className={styles.separator} />
						{authState.balance! - props.price < 0 ? (
							<div>
								<span className={styles.alert}>You don't have enough BD coins to buy this :(</span>
							</div>
						) : (
							<div className="d-flex w-100 gap-3 align-items-center">
								<div className="col-4">
									<span className="fw-bold">Your balance after purchase:</span>
								</div>
								<div className={styles.contentInfo}>
									<span className="d-flex w-100 secondaryText align-items-center">
										<Lottie animationData={coinData} width={30} height={30} />
										{authState.balance! - props.price} BD
									</span>
								</div>
							</div>
						)}
						<GenericButton
							type="button"
							variant="cian"
							disabled={authState.balance! - props.price < 0}
							onClick={handlePurchase}
							className="my-4 w-50"
						>
							Confirm Purchase
						</GenericButton>
					</div>
				</div>
			)}
		</GenericModal>
	);
}
