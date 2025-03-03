import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ModelsData } from '../../types/type.ts';
import api from '../../api/authMiddleware.ts';

export const fetchModelsList = createAsyncThunk<ModelsData[]>('models/fetchModelsList', async (_, { rejectWithValue }) => {
	try {
		const response = await api.get('/models/list');
		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data || 'Ошибка загрузки моделей');
	}
});

type ModelsState = {
	models: ModelsData[];
	loading: boolean;
	error: string | null;
}

const initialState: ModelsState = {
	models: [],
	loading: false,
	error: null,
};

const modelsSlice = createSlice({
	name: 'models',
	initialState,
	reducers: {},
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

export default modelsSlice.reducer;
