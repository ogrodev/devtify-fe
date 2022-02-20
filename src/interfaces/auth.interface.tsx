export interface IAuth {
	authenticated: boolean;
	email?: string;
	id?: string;
	token?: string;
	coins?: number;
	avatar?: string;
	name?: string;
	job_title?: string;
	project_name?: string;
	linkedin_url?: string;
	persist?: boolean;
}
