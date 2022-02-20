import MainBanner from "../../components/Banner/mainBanner";
import { Lottie } from "../../components/Lottie/lottie";
import styles from "./marketplace.module.sass";
import coinData from "../../components/Lottie/animations/coin.json";
import useAuth from "../../hooks/useAuth";
import mockedProducts from "./MockedData/mockedProducts.json";
import ProductCard from "../../components/Cards/product.card";
import { FormProvider, useForm } from "react-hook-form";
import TextArea from "../../components/FormControls/TextArea/TextArea";
import GenericButton from "../../components/Buttons/genericButton";
import { BiStore } from "react-icons/bi";

interface IFormData {
	message: string;
}

export default function Marketplace() {
	const { authState } = useAuth();
	const methods = useForm<IFormData>();

	const sendMsg = (data: IFormData) => {
		// Make a request to API to save feedback
	};
	return (
		<div className={`position-relative text-start defaultPadding pt-5 ${styles.container}`}>
			<MainBanner />
			<div className="d-flex justify-content-between align-items-center">
				<div className={styles.titleContainer}>
					<h2>
						<BiStore size="1.5em" /> The Marketplace
					</h2>
					<span>Here you can trade your DB Coins for rewards</span>
				</div>
				<div className={styles.coinContainer}>
					<span>You have</span>
					<div className="d-flex align-items-center gap-2">
						<Lottie animationData={coinData} width={24} height={24} />
						<span>{authState.coins} BD</span>
					</div>
				</div>
			</div>
			<div className="d-flex gap-3 flex-wrap">
				{mockedProducts.map((product) => {
					return <ProductCard product={product} key={product.id} />;
				})}
			</div>
			<div className="pt-5 mt-5" />
			<div className="my-5">
				<div className="mb-3">
					<h5>Our marketplace continues to grow</h5>
					<span>What would you like to be able to get through your BDCoins?</span>
				</div>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(sendMsg)} className={styles.feedbackForm}>
						<TextArea id="message" placeholder="Comment here" isRequired className="w-100" />
						<GenericButton type="submit" className="w-100 mt-3 mb-5">
							Give feedback
						</GenericButton>
					</form>
				</FormProvider>
			</div>
		</div>
	);
}
