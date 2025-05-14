import api from './authMiddleware.ts';
import {
	CreateModelCommentType, CreateNoteParams,
	DatasetsType, DeleteNoteParams, GetNotesParams,
	ModelsData,
	NewDatasetType,
	NewModelData,
	Note, UpdateNoteParams,
	UserCredentials,
} from '../types/type.ts';

export const methods = {
	auth: {
		async login({ email, password }: UserCredentials) {
			return await api.post('/auth/login', {
				email,
				password,
			});
		},
		async register(user: UserCredentials) {
			return await api.post('/auth/register', user);
		},
		async logout() {
			return await api.post(`/auth/logout`);
		},
	},
	user: {
		async deleteUser(userId: number) {
			return await api.delete(`/user/${userId}`);
		},
		async getUserInfo(userId: number) {
			return await api.get(`/user/userById/${userId}`);
		},
		async updateUser(user: Partial<UserCredentials>) {
			return await api.put(`/user/${user?.id}`, user);
		},
		async getUsers() {
			return await api.get(`/user/all`);
		},
		async updateUserRole(userId: number, role: string) {
			return await api.put(`/user/${userId}/role`, {
				role,
			})
		}
	},
	model: {
		async createModel(data: NewModelData) {
			return await api.post(`/models/create`, data);
		},
		async updateModel(id: number, data: ModelsData) {
			console.log(data);
			return await api.put(`/models/update/${id}`, data);
		},
		async deleteModel(id: number) {
			return await api.delete(`/models/delete/${id}`);
		},
		async getModelById(id: number) {
			return await api.get(`/models/${id}`);
		},
		async modelMetrics(id: number) {
			return await api.get(`/models/metrics/${id}?period=7d`);
		},
		comment: {
			async createComment(comment: CreateModelCommentType) {
				console.log(comment);
				return await api.post(`/comments/create`, comment);
			},
			async deleteComment(commentId: number) {
				return await api.delete(`/comments/delete/${commentId}`);
			},
			async updateComment(comment: CreateModelCommentType) {
				return await api.put(`/comments/update/${comment.modelId}`, comment);
			},
			async getComments({modelId}: CreateModelCommentType) {
				return await api.get(`/comments/${modelId}`);
			}
		}
	},
	datasets: {
		async getDatasets() {
			return await api.get('/datasets/list');
		},
		async createDataset(dataset: NewDatasetType) {
			return await api.post('/datasets/create', dataset);
		},
		async getDatasetById(id: number) {
			return await api.get(`/datasets/${id}`);
		},
		async updateDataset(dataset: DatasetsType) {
			return await api.put(`/datasets/update/${dataset.id}`, dataset)
		},
		async deleteDataset(id: number) {
			return await api.delete(`/datasets/delete/${id}`);
		},
		async getList() {
			return await api.get('/datasets/text-classification');
		}
	},
	notes: {
		async getNotesForModel(params: GetNotesParams): Promise<Note[]> {
			return await api.get('/notes/all', { params });
		},
		async createNote(params: CreateNoteParams): Promise<Note> {
			return await api.post('/notes', params);
		},
		async updateNote(params: UpdateNoteParams): Promise<Note> {
			return await api.put(`/notes/${params.id}`, params);
		},
		async deleteNote(params: DeleteNoteParams): Promise<void> {
			return await api.delete(`/notes/${params.id}`, { data: params });
		},
	},
	chat: {
		async newFetchToModel(data: { modelId: number, inputText: string, chatId: string, userId: number }): Promise<void> {
			return await api.post('/python/generate', data);
		}
	}
};