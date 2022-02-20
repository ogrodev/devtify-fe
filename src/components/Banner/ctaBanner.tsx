import GenericButton from "../Buttons/genericButton";
import styles from "./ctaBanner.module.sass";

interface IProps {
	icon: React.ReactNode;
	text: string;
	children: React.ReactNode | React.ReactNode[];
	onClick?: () => void;
}

export default function CTABanner(props: IProps) {
	return (
		<div className={`${styles.container} defaultPadding`}>
			<div className={styles.icon}>{props.icon}</div>
			<h3 className={styles.text}>{props.text}</h3>
			<GenericButton type="button" className={styles.btn} onClick={props.onClick} variant="cian">
				{props.children}
			</GenericButton>
		</div>
	);
}
