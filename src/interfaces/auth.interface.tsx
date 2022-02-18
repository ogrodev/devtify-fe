export interface IAuth {
	authenticated: boolean;
	token?: string;
	coins?: number;
	avatar?: string;
	name?: string;
	title?: string;
	projects?: string[];
	linkedin?: string;
}
