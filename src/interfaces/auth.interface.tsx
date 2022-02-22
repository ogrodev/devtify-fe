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
