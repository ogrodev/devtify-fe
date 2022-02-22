import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { IWorkshop } from "../../interfaces/app.interface";
import { workshopService } from "../../services/workshop";
import GenericButton from "../Buttons/genericButton";
import Checkbox from "../FormControls/Checkbox/checkbox";
import DateInput from "../FormControls/DateInput/DateInput";
import FileInput from "../FormControls/FileInput/fileInput";
import TextArea from "../FormControls/TextArea/TextArea";
import TextInput from "../FormControls/TextInput/TextInput";
import { Lottie } from "../Lottie/lottie";
import GenericModal from "./genericModal";
import styles from "./newEventModal.module.sass";
import coinData from "../Lottie/animations/coin.json";
import useSettings from "../../hooks/useSettings";
import { TOGGLE_WS_MODAL, UPDATE_APP } from "../../reducers/app.reducer";
import useNotification from "../../hooks/useNotification";
import useAuth from "../../hooks/useAuth";
import { UPDATE_AUTH } from "../../reducers/auth.reducer";
import { AxiosError } from "axios";

interface IWorkshopForm extends IWorkshop {
	isPaid: boolean;
	isFree: boolean;
}

export default function NewEventModal() {
	const [isLoading, setIsLoading] = useState(false);
	const [freeEvent, setFreeEvent] = useState<boolean>(true);
	const [file, setFile] = useState<string>("");

	const { settings, updateAppSettings } = useSettings();
	const { authState, updateAuthState } = useAuth();
	const notify = useNotification();
	const eventMethods = useForm<IWorkshopForm>({
		defaultValues: {
			isFree: true,
		},
	});

	const handleIsFree = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFreeEvent(true);
		eventMethods.setValue("price", 0);
		eventMethods.setValue("isPaid", false);
	};

	const handleIsPaid = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFreeEvent(false);
		eventMethods.setValue("isFree", false);
	};

	const submitEvent = (data: IWorkshopForm) => {
		setIsLoading(true);
		const workshop: any = {
			title: data.title,
			description: data.description,
			duration: data.duration,
			date: data.date,
			price: data.price,
			skills: data.skills,
			thumbnail_url: file,
		};
		workshopService
			.submit(workshop)
			.then((response) => {
				setIsLoading(false);
				updateAppSettings(TOGGLE_WS_MODAL);
				updateAppSettings(UPDATE_APP, { workshops: [response.data, ...settings.workshops] });
				updateAuthState(UPDATE_AUTH, { balance: authState.balance! + 10 });
				notify("Workshop created successfully", "Success");
			})
			.catch((error: AxiosError) => {
				setIsLoading(false);
				notify(error.response?.data?.message || "An error occured while creating the workshop", "Error");
			});
	};

	return (
		<GenericModal modalType="workshop" title="Create event">
			<div className="py-2 px-3">
				<div className="d-flex gap-4 align-items-stretch">
					<div className={`${styles.blueColumn} col-3`} />
					<div className="d-flex flex-column align-items-center justify-content-center col-9 pe-3">
						<FormProvider {...eventMethods}>
							<form onSubmit={eventMethods.handleSubmit(submitEvent)} className="w-100">
								<TextInput
									id="title"
									label="Title of your event"
									isRequired
									className="mb-2 defaultInput"
								/>
								<TextInput
									id="skills"
									label="Skills covered"
									isRequired
									className="mb-2 defaultInput"
								/>
								<TextArea
									id="description"
									label="Description"
									isRequired
									className="my-2 defaultInput w-100"
									rows={4}
								/>
								<DateInput id="date" label="Date" isRequired className="mb-2 defaultInput" />
								<div className="my-2">
									<TextInput id="duration" label="Duration in minutes" type="number" />
								</div>
								<div className="d-flex gap-4 align-items-center">
									<Checkbox
										id="isFree"
										className="mb-2 defaultInput col-auto"
										onChange={handleIsFree}
									>
										Free event
									</Checkbox>
									<Checkbox id="isPaid" className="mb-2 defaultInput" onChange={handleIsPaid}>
										I will charge BD Coins
									</Checkbox>
								</div>
								<div hidden={freeEvent} className="my-2">
									<TextInput id="price" label="How many BD coins?" type="number" />
								</div>
								<div>
									{file ? (
										<div className={styles.fileContainer}>
											<img src={file} alt="" />
											<GenericButton
												type="button"
												onClick={() => setFile("")}
												variant="purple"
												className="mx-auto mt-3"
											>
												Change thumbnail
											</GenericButton>
										</div>
									) : (
										<FileInput onSelect={(file: string) => setFile(file)} />
									)}
								</div>
								<div className="d-flex gap-2 align-items-center my-3">
									<Lottie animationData={coinData} width={50} height={50} />
									<h6>By creating this event you will win 10BD coins</h6>
								</div>
								<div className={styles.finalComm}>
									<p>After posting this event, a Zoom Link will be generated automatically.</p>
									<p>
										By creating this event you will be accepting our{" "}
										<em>terms and conditions and community policy.</em>
									</p>
								</div>
								<GenericButton
									type="submit"
									className="mt-5 w-100"
									disabled={isLoading}
									loading={isLoading}
								>
									{isLoading ? "Creating..." : "Create event"}
								</GenericButton>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</GenericModal>
	);
}
