import GenericModal from "./genericModal";

interface IProps {
	name: string;
}

export default function NewEventModal(props: IProps) {
	return (
		<GenericModal modalType="event">
			<div className="d-flex">
				<div></div>
				<div className="d-flex flex-column align-items-center justify-content-center"></div>
			</div>
		</GenericModal>
	);
}
