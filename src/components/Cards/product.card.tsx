import { Lottie } from "../Lottie/lottie";
import styles from "./product.card.module.sass";
import coinData from "../Lottie/animations/coin.json";
import BuyModal from "../Modal/buyModal";
import useSettings from "../../hooks/useSettings";
import { IProduct } from "../../interfaces/app.interface";

interface IProps {
	product: IProduct;
}

export default function ProductCard(props: IProps) {
	const { toggleModal } = useSettings();
	const handleBuy = () => {
		toggleModal("purchase" + props.product.id);
	};

	return (
		<>
			<div className={styles.product} key={props.product.id} onClick={handleBuy}>
				<div className={styles.productImg}>
					<img src={props.product.thumbnail_url} alt={props.product.title} />
				</div>
				<div className={styles.productInfo}>
					<span className={styles.productName}>{props.product.title}</span>
					<div className="d-flex gap-2 align-items-center">
						<Lottie animationData={coinData} width={20} height={20} />
						<span className="mt-1">{Math.round(props.product.price)} DB</span>
					</div>
				</div>
			</div>
			<BuyModal name={props.product.title} price={Math.round(props.product.price)} id={props.product.id} />
		</>
	);
}
