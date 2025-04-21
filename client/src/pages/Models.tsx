import { Box, CircularProgress, Grid, Typography, Card, CardContent, useTheme, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ModelsData } from '../types/type.ts';
import ModelCard from '../components/models/ModelCard.tsx';
import { AppDispatch, RootState } from '../store';
import { fetchModelsList } from '../store/slices/modelsSlice.ts';
import CreateNewModel from '../components/models/CreateNewModel.tsx';
import AddIcon from '@mui/icons-material/Add';
import { motion } from 'framer-motion';

const Models = () => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const { models, loading } = useSelector((state: RootState) => state.models);
	const isAdmin = useSelector((state: RootState) => state.user?.user?.role) === 'admin';
	const [newModel, setNewModel] = useState(false);

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	return (
		<Box sx={{
			py: 8,
			backgroundColor: theme.palette.background.default,
		}}>
			<Container maxWidth="xl">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Typography
						variant="h3"
						sx={{
							mb: 6,
							textAlign: 'center',
							fontWeight: 700,
							color: theme.palette.text.primary,
						}}
					>
						Доступные модели
					</Typography>
				</motion.div>

				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
						<CircularProgress size={60} />
					</Box>
				) : (
					 <Grid container spacing={4} justifyContent="center">
						 {models.map((model: ModelsData) => (
							 <Grid item key={model.id} xs={12} sm={6} md={4} lg={3}>
								 <motion.div
									 whileHover={{ y: -5 }}
									 transition={{ duration: 0.2 }}
									 style={{ height: '100%' }}
								 >
									 <ModelCard model={model} />
								 </motion.div>
							 </Grid>
						 ))}

						 {isAdmin && (
							 <Grid item xs={12} sm={6} md={4} lg={3}>
								 <motion.div whileHover={{ scale: 1.02 }}>
									 <Card
										 onClick={() => setNewModel(true)}
										 sx={{
											 height: '100%',
											 minHeight: 200,
											 display: 'flex',
											 flexDirection: 'column',
											 cursor: 'pointer',
											 transition: 'all 0.3s ease',
											 backgroundColor: theme.palette.background.paper,
											 '&:hover': {
												 boxShadow: theme.shadows[8],
												 backgroundColor: theme.palette.action.hover,
											 }
										 }}
									 >
										 <CardContent sx={{
											 flex: 1,
											 display: 'flex',
											 flexDirection: 'column',
											 justifyContent: 'center',
											 alignItems: 'center',
											 gap: 2
										 }}>
											 <AddIcon sx={{
												 fontSize: 60,
												 color: theme.palette.text.secondary
											 }} />
											 <Typography variant="h6" color="text.secondary">
												 Добавить новую модель
											 </Typography>
										 </CardContent>
									 </Card>
								 </motion.div>
							 </Grid>
						 )}
					 </Grid>
				 )}
			</Container>

			<CreateNewModel newModel={newModel} setNewModel={setNewModel} />
		</Box>
	);
};

export default Models;