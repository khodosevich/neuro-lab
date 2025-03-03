import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { ModelsData } from '../../types/type.ts';
import { NavLink } from 'react-router-dom';

const ModelCard = ({ model } : { model: ModelsData }) => {

	console.log(model);

	return (
		<Card sx={{ minWidth: 345, maxWidth: 345 , height: "100%",
			display: "flex", flexDirection: "column" }}
		>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{ model.name }
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>
					{ model.description }
				</Typography>
			</CardContent>
			<CardActions sx={{ flexGrow: 1, alignItems: "end" }}>
				<NavLink to={`/models/${model.id}`}>
					Попробовать
				</NavLink>
				<NavLink to={`/models/${model.id}`}>
					Подробнее
				</NavLink>
			</CardActions>
		</Card>
	);
};

export default ModelCard;