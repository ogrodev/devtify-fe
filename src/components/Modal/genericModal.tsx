import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useSettings from "../../hooks/useSettings";

interface IProps {
	modalType: string;
	title: string;
	children: React.ReactNode | React.ReactNode[];
	footer?: React.ReactNode | React.ReactNode[];
}
export default function GenericModal(props: IProps) {
	const { settings, updateAppSettings } = useSettings();

	const toggleModal = () => {
		updateAppSettings("APP/MODAL/" + props.modalType.toUpperCase());
	};

	return (
		<Modal toggle={() => toggleModal()}>
			<ModalHeader toggle={() => toggleModal()}>{props.title}</ModalHeader>
			<ModalBody>{props.children}</ModalBody>
			{props.footer && <ModalFooter>{props.footer}</ModalFooter>}
		</Modal>
	);
}
