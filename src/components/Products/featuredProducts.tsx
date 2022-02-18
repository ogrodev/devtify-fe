import { Lottie } from "../Lottie/lottie";
import styles from "./featuredProducts.module.sass";
import mockedProducts from "./MockedData/mockedProducts.json";
import coinData from "../Lottie/animations/coin.json";

export default function FeaturedProducts() {
	return (
		<div className="my-5">
			<h3 className="mt-4 mb-3">Marketplace</h3>
			<div className={styles.productStrip}>
				{mockedProducts.map((product) => {
					return (
						<div className={styles.product} key={product.id}>
							<div className={styles.productImg}>
								<img src={product.image} alt={product.name} />
							</div>
							<div className={styles.productInfo}>
								<span className={styles.productName}>{product.name}</span>
								<div className="d-flex gap-2 align-items-center">
									<Lottie animationData={coinData} width={20} height={20} />
									<span className="mt-1">{product.price} DB</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
