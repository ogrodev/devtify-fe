import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import useSettings from "../../hooks/useSettings";

interface IProps {
	modalType: string;
	children: React.ReactNode | React.ReactNode[];
	title?: string;
	footer?: React.ReactNode | React.ReactNode[];
}
export default function GenericModal(props: IProps) {
	const { settings, toggleModal } = useSettings();

	const handleToggleModal = () => {
		toggleModal(props.modalType);
	};

	return (
		<Modal centered isOpen={settings.modal[props.modalType]} toggle={() => handleToggleModal()}>
			{props.title && <ModalHeader toggle={() => handleToggleModal()}>{props.title}</ModalHeader>}
			<ModalBody>{props.children}</ModalBody>
			{props.footer && <ModalFooter>{props.footer}</ModalFooter>}
		</Modal>
	);
}
