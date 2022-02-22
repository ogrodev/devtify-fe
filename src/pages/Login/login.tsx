import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import GenericButton from "../../components/Buttons/genericButton";
import Checkbox from "../../components/FormControls/Checkbox/checkbox";
import TextInput from "../../components/FormControls/TextInput/TextInput";
import RegisterForm from "../../components/Forms/register.form";
import CollabLogo from "../../components/Logo/collab.logo";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import { IAuth } from "../../interfaces/auth.interface";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
import { routeConfig } from "../../routes/routeConfig";
import { authService } from "../../services/auth";
import styles from "./login.module.sass";

interface ILogin {
	email: string;
	password: string;
	rememberMe: boolean;
}

export default function Login() {
	const [loggingIn, setLoggingIn] = useState(false);
	const [newAccount, setNewAccount] = useState(false);
	const loginMethods = useForm<ILogin>();
	const navigate = useNavigate();
	const notify = useNotification();
	const { authState, updateAuthState } = useAuth();

	const handleLogin = (data: ILogin) => {
		setLoggingIn(true);
		authService
			.tryLogin(data.email, data.password)
			.then((res: AxiosResponse) => {
				let auth: IAuth = res.data?.user;
				auth.token = res.data?.token;
				auth.persist = data.rememberMe;
				auth.authenticated = true;
				auth.progression = res.data?.progression;
				updateAuthState(UPDATE_AUTH, auth);
				navigate(routeConfig.home.path);
				setLoggingIn(false);
			})
			.catch((error: AxiosError) => {
				notify(error.response?.data?.message || "An error occurred while logging in.", "Error");
				setLoggingIn(false);
			});

		return () => {
			setLoggingIn(false);
		};
	};

	const toggleNewAccount = () => {
		setNewAccount(!newAccount);
		loginMethods.reset();
	};

	useEffect(() => {
		if (authState.authenticated) {
			navigate(routeConfig.home.path);
		}
	}, [authState.authenticated]);

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginForm}>
				<div className="text-start w-100">
					<div className="mb-5">
						<CollabLogo size="small" version="vertical" />
					</div>

					{newAccount ? (
						<RegisterForm />
					) : (
						<div>
							<h2 className="mt-4 mb-0">Welcome!</h2>
							<p className="secondaryText mb-4">Enter your credentials to access your account</p>
							<FormProvider {...loginMethods}>
								<form onSubmit={loginMethods.handleSubmit(handleLogin)} className={styles.form}>
									<TextInput
										id="email"
										placeholder="Your BairesDev e-mail address"
										isRequired
										className="mb-4"
									/>
									<TextInput
										id="password"
										placeholder="Password"
										isRequired
										isPassword
										className="mb-0"
									/>
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
					)}
					<a
						className="d-flex align-items-center flex-column text-decoration-none mt-4"
						onClick={toggleNewAccount}
					>
						<span className={styles.reset}>or</span>
						<span className={styles.toggleBtn}>
							{newAccount ? "Login to existing account" : "Create new account"}
						</span>
					</a>
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
