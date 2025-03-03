export type UserCredentials = {
	email: string;
	password?: string;
	username: string;
	role?: string;
	id?: number;
}

export type UserProfile = {
	userId: string;
	email: string;
	username: string;
	exp: number;
	iat: number;
	created_at: string;
	role: string;
}

export type ModelsData = {
	"id": number,
	"name": string,
	"description": string,
	"model_url": string,
	"dataset_url": string,
	"parameters": object[],
	"created_at": string,
	"updated_at": string
}

export type AlertDate = {
	isShowAlert: boolean;
	type: 'success' | 'info' | 'warning' | 'error';
	"message": string,
}

export enum AlertType {
	SUCCESS = 'success',
	ERROR = 'error',
	INFO = 'info',
	WARNING = 'warning',
}