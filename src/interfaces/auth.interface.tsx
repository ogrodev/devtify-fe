export interface IAuth {
	authenticated: boolean;
	id?: number;
	email?: string;
	token?: string;
	balance?: number;
	image?: string;
	name?: string;
	job_title?: string;
	project_client?: string;
	linkedin_url?: string;
	persist?: boolean;
	progression?: number;
	rewards?: IReward[];
	workshops?: IWorkshop[];
	attended_workshops?: IWorkshop[];
}

export interface IReward {
	id: number;
	code: string;
	name: string;
	description: string;
	value: number;
	active: number;
	created_at: string;
	updated_at: string;
	claimed: boolean;
	claimable: boolean;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	created_at: string;
	updated_at: string;
	balance: number;
	job_title: string;
	project_client: string;
	linkedin_url: string;
	image?: string;
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
	likes: ILike[];
	created_at: string;
	updated_at: string;
}

export interface ILike {
	id: number;
	user_id: number;
	workshop_id: number;
}
