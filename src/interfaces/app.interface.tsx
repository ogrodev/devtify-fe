export interface IApp {
	theme: string;
	notification: {
		show: boolean;
		message?: string;
		title?: string;
		type?: string;
		delay?: number;
	};
	modal: {
		[key: string]: boolean;
	};
}
