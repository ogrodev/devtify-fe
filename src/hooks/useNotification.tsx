import useSettings from "./useSettings";
import { UPDATE_APP } from "../reducers/app.reducer";

export default function useNotification() {
	const { updateAppSettings } = useSettings();

	function notify(message: string, title: "Error" | "Success", delay: number | null = null) {
		updateAppSettings(UPDATE_APP, {
			notification: {
				message,
				title,
				show: true,
				delay,
			},
		});
	}
	return notify;
}
