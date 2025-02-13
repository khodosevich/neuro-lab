import { Box, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { methods } from '../../api/methods.ts';
import { getModelsList } from '../../../store/actios-creators/modelsAction.ts';
import { ModelsData } from '../../types/type.ts';
import ModelCard from './ModelCard.tsx';
import { RootState } from '../../../store';

const Models = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const models = useSelector((state: RootState) => state.models.models);

	const getModels = async () => {
		try {
			const models = await methods.models.getModelsList();
			dispatch(getModelsList(models?.data));
		}
		catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getModels();
	}, [])

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default }}>
			<Box className="container" sx={{ paddingTop: 5 }}>
				<Grid container spacing={2}>
					{
						models.map((model: ModelsData) => (
							<Grid item key={ model.id }>
								<ModelCard model={ model } />
							</Grid>
						))
					}
				</Grid>
			</Box>
		</Box>
	);
};

export default Models;