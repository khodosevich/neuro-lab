export type UserCredentials = {
	email: string;
	password?: string;
	username: string;
	role?: string;
	id?: number;
	oldPassword?: string;
}

export type UserProfile = {
	email: string;
	username: string;
	exp: number;
	iat: number;
	created_at: string;
	role: string;
	password: string;
	id: number;
}

export type ModelsData = {
	id: number,
	name: string,
	description: string,
	model_url: string,
	dataset_url: string,
	parameters: object[],
	created_at: string,
	updated_at: string,
}

export type ModelSidebarType = {
	item: ModelsData
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

export type CreateModelCommentType = {
	modelId?: number,
	userId?: number,
	content?: string,
}

export type ModelCommentType = {
	content: string;
	created_at: string;
	id: number;
	model_id: number;
	updated_at: string;
	user_id: number;
}

export type PerformanceDataType = {
	name: string;
	accuracy: number
}

export type ModelTrainingTimeType = {
	name: string;
	time: number
}

export type DatasetsType = {
	id: number,
	name: string,
	description: string,
	model_id: number,
	dataset_url: string,
	created_at: string,
	updated_at: string,
}

export type NewModelData = {
	name: string;
	description: string;
	modelUrl: string;
	datasetUrl?: string;
	parameters?: {
		[key: string]: never;
	};
}