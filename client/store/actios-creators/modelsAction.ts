import { GET_MODELS_LIST } from '../reducers/modelsReducer';
import { ModelsData } from '../../src/types/type.ts';

export const getModelsList = (payload: ModelsData) => ({
	type: GET_MODELS_LIST,
	payload
});
