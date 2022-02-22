import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useNotification from "../../hooks/useNotification";
import { authService } from "../../services/auth";
import { createImageFromInitials } from "../../utils/imageFromText.util";
import GenericButton from "../Buttons/genericButton";
import { BsFillCameraFill } from "react-icons/bs";
import TextInput from "../FormControls/TextInput/TextInput";
import GenericModal from "./genericModal";
import styles from "./profileModal.module.sass";
import useSettings from "../../hooks/useSettings";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
import { AxiosError } from "axios";

interface IProfileForm {
	name?: string;
	job_title?: string;
	project_client?: string;
	linkedin_url?: string;
}

export default function ProfileModal() {
	const { authState, updateAuthState } = useAuth();
	const { toggleModal } = useSettings();
	const [fileString, setFileString] = useState(
		authState.image || createImageFromInitials(150, authState.name || "User", "#0473b1")
	);
	const profileMethods = useForm<IProfileForm>({
		defaultValues: {
			name: authState.name,
			job_title: authState.job_title,
			project_client: authState.project_client,
			linkedin_url: authState.linkedin_url,
		},
	});
	const inputFilePicker = useRef<HTMLInputElement>(null);
	const notify = useNotification();
	const maxSize = 5 * 1024 * 1024;

	const importFile = () => {
		if (!inputFilePicker.current) return;
		inputFilePicker.current.click();
	};

	const handleUpdateFile = async (e: ChangeEvent<HTMLInputElement>) => {
		const file: File = e.target.files![0];
		if (file.size > maxSize) {
			notify("File is too big!", "Error");
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setFileString(reader.result as string);
			updateAuthState(UPDATE_AUTH, { image: reader.result as string });
		};
	};

	const handleSaveProfile = (data: IProfileForm) => {
		const requestData = {
			name: data.name,
			job_title: data.job_title,
			project_client: data.project_client,
			linkedin_url: data.linkedin_url,
			image: fileString,
		};
		authService
			.update(requestData)
			.then(() => {
				toggleModal("profile");
				updateAuthState(UPDATE_AUTH, requestData);
			})
			.catch((error: AxiosError) => {
				notify(error.response?.data.message || "Something went wrong!", "Error");
			});
	};

	return (
		<GenericModal modalType={"profile"} title="Edit your profile">
			<div className="d-flex gap-4">
				<div className={`${styles.blueColumn} col-3`} />
				<div className={styles.content}>
					<FormProvider {...profileMethods}>
						<form
							className="d-flex flex-column gap-3 col-9"
							onSubmit={profileMethods.handleSubmit(handleSaveProfile)}
						>
							<TextInput id="name" label="Name" />
							<TextInput id="job_title" label="Job Title" />
							<TextInput id="project_client" label="Project assigned" />
							<TextInput id="linkedin_url" label="Full Linkedin URL" />

							<label>Picture</label>
							<div className={styles.pictureContainer}>
								<img src={fileString} alt="Profile" className={styles.profileImage} />
								<input
									hidden
									type="file"
									accept={"image/jpeg, image/png, image/gif"}
									onChange={(e) => handleUpdateFile(e)}
									ref={inputFilePicker}
									className={styles.inputFile}
								/>
								<GenericButton type="button" onClick={importFile} className={styles.cameraBtn}>
									<BsFillCameraFill color="#fff" />
								</GenericButton>
							</div>

							<GenericButton type="submit" className="mt-4">
								Save
							</GenericButton>
						</form>
					</FormProvider>
				</div>
			</div>
		</GenericModal>
	);
}
