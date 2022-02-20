import { IUser } from "./auth.interface";

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
	workshops: IWorkshop[];
	news: INews[];
	openSourceProjects: IOpenSourceProject[];
	highlights: {
		workshop: IWorkshop;
		news: INews;
		openSourceProject: IOpenSourceProject;
	};
}

export interface IWorkshop {
	id?: string;
	title: string;
	category_id: number;
	skills: string;
	price: number;
	duration: number;
	user: IUser;
	thumbnail_url: string;
	meeting_link: string;
	date: string;
	description: string;
	user_id: number;
	liked: boolean;
	likes: number;
	created_at: string;
	updated_at: string;
}

export interface INews {
	id: string;
	title: string;
	category: string;
	description: string;
}

export interface IOpenSourceProject {
	id: string;
	title: string;
	category: string;
	description: string;
	link: string;
}
