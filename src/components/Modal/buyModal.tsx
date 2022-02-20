import GenericModal from "./genericModal";

interface IProps {
	name: string;
}

export default function BuyModal(props: IProps) {
	return (
		<GenericModal modalType="product">
			<div className="d-flex">
				<div></div>
				<div className="d-flex flex-column align-items-center justify-content-center"></div>
			</div>
		</GenericModal>
	);
}
