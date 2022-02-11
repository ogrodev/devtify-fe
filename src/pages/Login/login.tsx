import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import GenericButton from "../../components/Buttons/genericButton";
import Checkbox from "../../components/FormControls/Checkbox/checkbox";
import TextInput from "../../components/FormControls/TextInput/TextInput";
import CollabLogo from "../../components/Logo/collab.logo";
import useAuth from "../../hooks/useAuth";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
import { routeConfig } from "../../routes/routeConfig";
import styles from "./login.module.sass";

interface ILogin {
	email: string;
	password: string;
	rememberMe: boolean;
}

export default function Login() {
	const [loggingIn, setLoggingIn] = useState(false);
	const methods = useForm<ILogin>();
	const navigate = useNavigate();
	const { updateAuthState } = useAuth();

	const handleLogin = (data: ILogin) => {
		setLoggingIn(true);
		// Make API call and check if user is valid and remove timeout
		updateAuthState(UPDATE_AUTH, { authenticated: true });
		setTimeout(() => {
			navigate(routeConfig.dashboard.path);
		}, 2000);
		return () => {
			setLoggingIn(false);
		};
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginForm}>
				<div className="text-start w-100">
					<div className="mb-5">
						<CollabLogo size="small" version="vertical" />
					</div>
					<h2 className="mt-4 mb-0">Welcome!</h2>
					<p className="secondaryText mb-4">Enter your credentials to access your account</p>
					<FormProvider {...methods}>
						<form onSubmit={methods.handleSubmit(handleLogin)} className={styles.form}>
							<TextInput
								id="email"
								placeholder="Your BairesDev e-mail address"
								isRequired
								className="mb-4"
							/>
							<TextInput id="password" placeholder="Password" isRequired isPassword className="mb-0" />
							<Checkbox id="rememberMe" className="mb-4">
								Remember me
							</Checkbox>
							<GenericButton
								type="submit"
								disabled={loggingIn}
								variant="blue"
								className="mt-4"
								loading={loggingIn}
							>
								{loggingIn ? "Loggin in..." : "Login"}
							</GenericButton>
						</form>
					</FormProvider>
				</div>
			</div>
			<div className={styles.dummyDiv} />
			<div className="col-12 col-lg-6">
				<div className={styles.imageContainer}>
					<img src="https://source.unsplash.com/random/1000x1080/?happiness" alt="" role="presentation" />
				</div>
			</div>
		</div>
	);
}
