import { Lottie } from "../Lottie/lottie";
import styles from "./product.card.module.sass";
import coinData from "../Lottie/animations/coin.json";

interface IProps {
	product: {
		id: string;
		name: string;
		image: string;
		price: string;
	};
}

export default function ProductCard(props: IProps) {
	return (
		<div className={styles.product} key={props.product.id}>
			<div className={styles.productImg}>
				<img src={props.product.image} alt={props.product.name} />
			</div>
			<div className={styles.productInfo}>
				<span className={styles.productName}>{props.product.name}</span>
				<div className="d-flex gap-2 align-items-center">
					<Lottie animationData={coinData} width={20} height={20} />
					<span className="mt-1">{props.product.price} DB</span>
				</div>
			</div>
		</div>
	);
}
