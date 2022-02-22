import { useEffect } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";
import useSettings from "../../hooks/useSettings";
import { UPDATE_APP } from "../../reducers/app.reducer";

export default function NotificationToast() {
	const { settings, updateAppSettings } = useSettings();

	function handleClose() {
		updateAppSettings(UPDATE_APP, { notification: { show: false } });
	}

	useEffect(() => {
		if (settings.notification.show) {
			setTimeout(() => {
				updateAppSettings(UPDATE_APP, { notification: { show: false } });
			}, 8000);
		}
		// eslint-disable-next-line
	}, [settings.notification.show]);

	return (
		<Toast isOpen={settings.notification.show} fade className={settings?.notification?.title + "toast"}>
			<ToastHeader toggle={handleClose}>{settings?.notification?.message}</ToastHeader>
		</Toast>
	);
}
