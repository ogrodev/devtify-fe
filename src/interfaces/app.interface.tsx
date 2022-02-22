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
	highlights: IHighlights;
	products: IProduct[];
}

interface IHighlights {
	workshop: IWorkshop;
	products: IProduct[];
}

export interface IWorkshop {
	id?: number;
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

export interface IProduct {
	id: number;
	title: string;
	description: string;
	price: number;
	thumbnail_url: string;
	highlighted: number;
	created_at: string;
	updated_at: string;
}
