import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { ModelsData } from '../../types/type.ts';

const ModelCard = ({ model } : { model: ModelsData }) => {
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
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Read More</Button>
			</CardActions>
		</Card>
	);
};

export default ModelCard;