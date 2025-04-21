import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DatasetsType } from '../../types/type.ts';

type DatasetsState = {
	datasets: DatasetsType[]
}

const initialState: DatasetsState = {
	datasets: [
		{
			id: 0,
			model_id: 0,
			name: '',
			description: '',
			data_url: '',
			created_at: '',
			updated_at: '',
		},
	],
};

const datasetsSlice = createSlice({
	name: 'datasets',
	initialState,
	reducers: {
		setDatasets(state, action: PayloadAction<DatasetsType[]>) {
			state.datasets = action.payload;
		},
		addDataset: (state, action: PayloadAction<DatasetsType>) => {
			state.datasets.unshift(action.payload);
		},
		deleteDataset: (state, action: PayloadAction<number>) => {
			state.datasets = state.datasets.filter(dataset => dataset.id !== action.payload);
		},
		updateDataset: (state, action: PayloadAction<DatasetsType>) => {
			state.datasets = state.datasets.map(dataset =>
				dataset.id === action.payload.id ? { ...dataset, ...action.payload } : dataset,
			);
		},
	}
});

export const { setDatasets, addDataset, deleteDataset, updateDataset } = datasetsSlice.actions;
export default datasetsSlice.reducer;
