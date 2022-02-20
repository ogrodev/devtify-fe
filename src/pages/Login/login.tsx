import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Spinner } from "reactstrap";
import GenericButton from "../../components/Buttons/genericButton";
import Checkbox from "../../components/FormControls/Checkbox/checkbox";
import TextInput from "../../components/FormControls/TextInput/TextInput";
import CollabLogo from "../../components/Logo/collab.logo";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import { IAuth } from "../../interfaces/auth.interface";
import { parsedLocalAuth, UPDATE_AUTH } from "../../reducers/auth.reducer";
import { routeConfig } from "../../routes/routeConfig";
import { authService } from "../../services/auth";
import styles from "./login.module.sass";

interface ILogin {
	email: string;
	password: string;
	rememberMe: boolean;
}

interface IRegister {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
	job_title: string;
	project_name: string;
	linkedin_url: string;
}

export default function Login() {
	const [loggingIn, setLoggingIn] = useState(false);
	const [registering, setRegistering] = useState(false);
	const [newAccount, setNewAccount] = useState(false);
	const loginMethods = useForm<ILogin>();
	const registerMethods = useForm<IRegister>();
	const navigate = useNavigate();
	const notify = useNotification();
	const { updateAuthState } = useAuth();

	const handleLogin = (data: ILogin) => {
		setLoggingIn(true);
		const randomNumber = Math.floor(Math.random() * 100);
		const mockedAuth: IAuth = {
			email: "pedroh.seven@gmail.com",
			id: "5e9f8f9b-f8b8-4f7b-b8e0-f8f8f8f8f8f8",
			name: "Pedro Henrique",
			job_title: "Software Engineer",
			authenticated: true,
			coins: randomNumber,
			avatar: "",
			project_name: "Channel program",
			linkedin_url: "https://www.linkedin.com/in/inpedromendes/",
		};
		updateAuthState(UPDATE_AUTH, mockedAuth);
		setLoggingIn(false);
		navigate(routeConfig.home.path);
		/* authService
			.tryLogin(data.email, data.password)
			.then((res: AxiosResponse) => {
				const auth: IAuth = res.data;
				updateAuthState(UPDATE_AUTH, auth);
				navigate(routeConfig.home.path);
				setLoggingIn(false);
			})
			.catch((error: AxiosError) => {
				notify(error.response?.data?.message || "An error occurred while logging in.", "Error");
				setLoggingIn(false);
			}); */

		return () => {
			setLoggingIn(false);
		};
	};

	const handleRegister = (data: IRegister) => {
		setRegistering(true);
		authService
			.register(
				data.email,
				data.email,
				data.job_title,
				data.project_name,
				data.linkedin_url,
				data.password,
				data.passwordConfirm
			)
			.then((res: AxiosResponse) => {
				const auth: IAuth = res.data;
				updateAuthState(auth);
				navigate(routeConfig.home.path);
				setRegistering(false);
			})
			.catch((error: AxiosError) => {
				notify(error.response?.data?.message || "An error occurred while registering.", "Error");
				setRegistering(false);
			});
	};

	const toggleNewAccount = () => {
		setNewAccount(!newAccount);
		loginMethods.reset();
		registerMethods.reset();
	};

	useEffect(() => {
		if (parsedLocalAuth?.authenticated) {
			navigate(routeConfig.home.path);
		}
	}, []);

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginForm}>
				<div className="text-start w-100">
					<div className="mb-5">
						<CollabLogo size="small" version="vertical" />
					</div>

					{newAccount ? (
						<div>
							<h2 className="mt-4 mb-0">Welcome!</h2>
							<p className="secondaryText mb-4">Enter your credentials to access your account</p>
							<FormProvider {...registerMethods}>
								<form onSubmit={registerMethods.handleSubmit(handleRegister)} className={styles.form}>
									<TextInput id="name" placeholder="Your name" isRequired className="mb-2" />
									<TextInput
										id="email"
										placeholder="Your BairesDev e-mail address"
										isRequired
										className="mb-2"
									/>
									<TextInput
										id="password"
										placeholder="Password"
										isRequired
										isPassword
										className="mb-2"
									/>
									<TextInput
										id="password_confirmation"
										placeholder="Password confirmation"
										isRequired
										isPassword
										className="mb-2"
									/>
									<TextInput
										id="job_title"
										placeholder="Your job title"
										isRequired
										className="mb-2"
									/>
									<TextInput
										id="project_name"
										placeholder="The project you are in now"
										isRequired
										className="mb-2"
									/>
									<TextInput
										id="linkedin_url"
										placeholder="Your full linkedin profile url"
										isRequired
										className="mb-2"
									/>
									<GenericButton
										type="submit"
										disabled={registering}
										variant="blue"
										className="mt-4"
										loading={registering}
									>
										{registering ? "Registering..." : "Register"}
									</GenericButton>
								</form>
							</FormProvider>
						</div>
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
