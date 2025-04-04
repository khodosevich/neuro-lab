import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ModelsData } from '../../types/type.ts';

const ModelDescription: React.FC<ModelsData> = ({ description, created_at, updated_at, dataset_url, model_url, name }) => {
	return (
		<>
			<Typography sx={{
				marginTop: '30px',
			}} variant="h4" gutterBottom>
				{name}
			</Typography>
			<Card>
				<CardContent>
					<Typography>
						<strong>Описание:</strong> {description}
					</Typography>
					<Typography>
						<strong>Дата создания:</strong> {new Date(created_at).toLocaleDateString()}
					</Typography>
					<Typography>
						<strong>Последнее обновление:</strong> {new Date(updated_at).toLocaleDateString()}
					</Typography>
					<Typography>
						<strong>Ссылка на датасет:</strong>
						<a href={dataset_url} target="_blank" rel="noopener noreferrer"> {dataset_url}</a>
					</Typography>
					<Typography>
						<strong>Ссылка на модель:</strong>
						<a href={model_url} target="_blank" rel="noopener noreferrer"> {model_url}</a>
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default ModelDescription;