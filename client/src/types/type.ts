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
	username: string;
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
	data_url: string,
	created_at: string,
	updated_at: string,
}

export type NewModelData = {
	name: string;
	description: string;
	modelUrl: string;
	datasetUrl: string;
	parameters?: {
		[key: string]: never;
	};
}

export type UserType = {
	id: number;
	username: string;
	email: string;
	role: string;
	created_at: string;
}

export type NewDatasetType = {
	name: string;
	description: string;
	data_url: string;
	model_id: number;
}

export interface Note {
	id: number;
	user_id: number;
	model_id: number;
	title: string;
	content: string;
	created_at: string;
	updated_at: string;
}

export interface CreateNoteParams {
	user_id: number;
	model_id: number;
	title: string;
	content: string;
}

export interface UpdateNoteParams {
	id: number;
	user_id: number;
	title?: string;
	content?: string;
}

export interface GetNotesParams {
	userId: number;
	modelId: number;
}

export interface DeleteNoteParams {
	id: number;
	user_id: number;
}