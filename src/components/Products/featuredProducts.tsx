import styles from "./featuredProducts.module.sass";
import mockedProducts from "./MockedData/mockedProducts.json";
import ProductCard from "../Cards/product.card";

export default function FeaturedProducts() {
	return (
		<div className="my-5">
			<h3 className="mt-4 mb-3">Marketplace</h3>
			<div className={styles.productStrip}>
				{mockedProducts.map((product) => {
					return <ProductCard product={product} key={product.id} />;
				})}
			</div>
		</div>
	);
}
