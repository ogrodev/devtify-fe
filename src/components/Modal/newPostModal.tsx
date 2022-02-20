import GenericModal from "./genericModal";

interface IProps {
	name: string;
}

export default function NewPostModal(props: IProps) {
	return (
		<GenericModal modalType="post">
			<div className="d-flex">
				<div></div>
				<div className="d-flex flex-column align-items-center justify-content-center"></div>
			</div>
		</GenericModal>
	);
}
