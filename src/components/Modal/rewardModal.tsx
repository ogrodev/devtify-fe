import useSettings from "../../hooks/useSettings";
import { Lottie } from "../Lottie/lottie";
import GenericModal from "./genericModal";
import rewardData from "../Lottie/animations/reward.json";
import GenericButton from "../Buttons/genericButton";
import { useNavigate } from "react-router-dom";
import { routeConfig } from "../../routes/routeConfig";

interface IProps {
	id: number;
	name: string;
	value: number;
}

export default function RewardModal(props: IProps) {
	const { toggleModal } = useSettings();
	const navigate = useNavigate();

	const handleClose = () => {
		toggleModal("reward" + props.id.toString());
	};
	const handleMoveToMkt = () => {
		toggleModal("reward" + props.id.toString());
		navigate(routeConfig.marketplace.path);
	};
	return (
		<GenericModal modalType={"reward" + props.id.toString()}>
			<div className="d-flex flex-column align-items-center justify-content-center p-5">
				<h2 className="text-center">
					Amazing!
					<br />
					You've claimed {props.value} BD coins
				</h2>
				<Lottie animationData={rewardData} width={400} height={400} />
				<div className="d-flex gap-4 align-items-stretch">
					<GenericButton type="button" onClick={handleClose}>
						Just close this
					</GenericButton>
					<GenericButton type="button" onClick={handleMoveToMkt} variant="cian">
						Take me to marketplace
					</GenericButton>
				</div>
			</div>
		</GenericModal>
	);
}
