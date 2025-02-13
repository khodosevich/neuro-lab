export interface UserCredentials {
	email: string;
	password: string;
	username: string;
}

export interface UserProfile {
	userId: string;
	email: string;
	username: string;
	exp: number;
	iat: number;
}

export interface ModelsData {
	"id": number,
	"name": string,
	"description": string,
	"model_url": string,
	"dataset_url": string,
	"parameters": object[],
	"created_at": string,
	"updated_at": string
}

export interface AlertDate {
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