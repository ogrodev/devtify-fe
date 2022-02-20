import useSettings from "./useSettings";
import { CODE_PROFANITY_ERROR } from "../constants/errorMessages.constant";
import { UPDATE_APP } from "../reducers/app.reducer";

export default function useNotification() {
	const { updateAppSettings } = useSettings();

	function notify(message: string, title: "Error" | "Success", delay: number | null = null) {
		if (message === CODE_PROFANITY_ERROR) {
			updateAppSettings(UPDATE_APP, { profaneModal: true });
		} else {
			updateAppSettings(UPDATE_APP, {
				notification: {
					message,
					title,
					show: true,
					delay,
				},
			});
		}
	}
	return notify;
}
