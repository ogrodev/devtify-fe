import { Spinner } from "reactstrap";

interface IProps {
	type: "submit" | "reset" | "button";
	className?: string;
	variant?: "purple" | "cian" | "gray" | "black" | "white" | "blue" | "text";
	label?: string;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	children?: React.ReactNode | React.ReactNode[];
	loading?: boolean;
}

export default function GenericButton(props: IProps) {
	return (
		<button
			type={props.type || "button"}
			className={`${props.className ? props.className : ""} ${
				props.variant || "blue"
			}Btn d-flex align-items-center justify-content-center gap-3`}
			disabled={props.disabled}
			onClick={props.onClick}
		>
			{props.label || props.children}
			{props.loading && <Spinner color="white" size="sm" />}
		</button>
	);
}
