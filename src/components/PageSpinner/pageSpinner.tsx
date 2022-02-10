import { Spinner } from "reactstrap";
import styles from "./pageSpinner.module.sass";

interface IProps {
	color: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
}

const PageSpinner = ({ color = "primary" }: IProps) => {
	return (
		<div className={styles.pageSpinner}>
			<Spinner color={color} />
		</div>
	);
};

export default PageSpinner;
