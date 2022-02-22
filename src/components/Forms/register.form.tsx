import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import { IAuth } from "../../interfaces/auth.interface";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
import { routeConfig } from "../../routes/routeConfig";
import { authService } from "../../services/auth";
import GenericButton from "../Buttons/genericButton";
import TextInput from "../FormControls/TextInput/TextInput";
import styles from "./register.module.sass";

interface IRegister {
	name: string;
	email: string;
	email_register: string;
	password: string;
	password_register: string;
	password_confirmation: string;
	job_title: string;
	project_client: string;
	linkedin_url: string;
}

export default function RegisterForm() {
	const [registering, setRegistering] = useState(false);
	const registerMethods = useForm<IRegister>();
	const { updateAuthState } = useAuth();
	const navigate = useNavigate();
	const notify = useNotification();

	const handleRegister = (data: IRegister) => {
		setRegistering(true);
		authService
			.register(
				data.name,
				data.email_register,
				data.job_title,
				data.project_client,
				data.linkedin_url,
				data.password_register,
				data.password_confirmation
			)
			.then((res: AxiosResponse) => {
				let auth: IAuth = res.data?.user;
				auth.token = res.data?.token;
				auth.authenticated = true;
				auth.progression = res.data?.progression;
				updateAuthState(UPDATE_AUTH, auth);
				navigate(routeConfig.home.path);
				setRegistering(false);
			})
			.catch((error: AxiosError) => {
				notify(error.response?.data?.message || "An error occurred while registering.", "Error");
				setRegistering(false);
			});
	};

	return (
		<div>
			<h2 className="mt-4 mb-0">Welcome!</h2>
			<p className="secondaryText mb-4">Enter your credentials to access your account</p>
			<FormProvider {...registerMethods}>
				<form onSubmit={registerMethods.handleSubmit(handleRegister)} className={styles.form}>
					<TextInput id="name" placeholder="Your name" isRequired className="mb-2" />
					<TextInput
						id="email_register"
						placeholder="Your BairesDev e-mail address"
						isRequired
						className="mb-2"
					/>
					<TextInput id="password_register" placeholder="Password" isRequired isPassword className="mb-2" />
					<TextInput
						id="password_confirmation"
						placeholder="Password confirmation"
						isRequired
						isPassword
						className="mb-2"
					/>
					<TextInput id="job_title" placeholder="Your job title" isRequired className="mb-2" />
					<TextInput
						id="project_client"
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
	);
}
