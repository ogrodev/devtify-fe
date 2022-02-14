export interface IAuth {
	authenticated: boolean;
	token?: string;
	coins?: number;
	avatar?: IAvatar;
	name?: string;
	title?: string;
	projects?: string[];
	linkedin?: string;
}

interface IAvatar {
	type: string;
	config: any;
	src: string;
}
