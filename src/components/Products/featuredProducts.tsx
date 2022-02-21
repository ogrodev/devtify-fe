import styles from "./featuredProducts.module.sass";
import ProductCard from "../Cards/product.card";
import { useEffect } from "react";
import useSettings from "../../hooks/useSettings";
import { Spinner } from "reactstrap";

export default function FeaturedProducts() {
	const { settings, updateAppSettings } = useSettings();

	useEffect(() => {
		updateAppSettings("FETCH_HIGHLIGHT_PRODUCTS");
		// eslint-disable-next-line
	}, []);

	return (
		<div className="my-5">
			<h3 className="mt-4 mb-3">Marketplace</h3>
			<div className={styles.productStrip}>
				{settings.highlights?.products?.slice(0, 4).map((product) => {
					return <ProductCard product={product} key={product.id} />;
				})}
				{!settings.highlights?.products?.length && (
					<div className="d-flex justify-content-center w-100">
						<Spinner />
					</div>
				)}
			</div>
		</div>
	);
}
