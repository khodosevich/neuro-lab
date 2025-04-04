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
			dataset_url: '',
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
		}
	}
});

export const { setDatasets } = datasetsSlice.actions;
export default datasetsSlice.reducer;
