import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ModelsData } from '../../types/type.ts';
import api from '../../api/authMiddleware.ts';

export const fetchModelsList = createAsyncThunk<ModelsData[]>('models/fetchModelsList', async (_, { rejectWithValue }) => {
	try {
		const response = await api.get('/models/list');
		return response.data;
	}
	catch (error: any) {
		return rejectWithValue(error.response?.data || 'Ошибка загрузки моделей');
	}
});

type ModelsState = {
	models: ModelsData[];
	loading: boolean;
	error: string | null;
	updateComments: boolean;
}

const initialState: ModelsState = {
	models: [],
	loading: false,
	error: null,
	updateComments: false,
};

const modelsSlice = createSlice({
	name: 'models',
	initialState,
	reducers: {
		setUpdateComments: (state, action: PayloadAction<boolean>) => {
			state.updateComments = action.payload;
		},
		addModel: (state, action: PayloadAction<ModelsData>) => {
			state.models.unshift(action.payload);
		},
		deleteModel: (state, action: PayloadAction<number>) => {
			state.models = state.models.filter(model => model.id !== action.payload);
		},
		updateModel: (state, action: PayloadAction<ModelsData>) => {
			console.log('updateModel', action.payload);
			state.models = state.models.map(model =>
				model.id === action.payload.id ? { ...model, ...action.payload } : model,
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchModelsList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchModelsList.fulfilled, (state, action: PayloadAction<ModelsData[]>) => {
				state.models = action.payload;
				state.loading = false;
			})
			.addCase(fetchModelsList.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { setUpdateComments, addModel, deleteModel, updateModel } = modelsSlice.actions;
export default modelsSlice.reducer;
