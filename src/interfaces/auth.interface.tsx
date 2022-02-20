export interface IAuth {
	authenticated: boolean;
	id?: number;
	email?: string;
	token?: string;
	balance?: number;
	avatar?: string;
	name?: string;
	job_title?: string;
	project_name?: string;
	linkedin_url?: string;
	persist?: boolean;
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
	avatar?: string;
}
