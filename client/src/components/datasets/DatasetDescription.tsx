import { Box, Card, CardContent, Typography } from '@mui/material';
import { DatasetsType } from '../../types/type.ts';
import React from 'react';
import { NavLink } from 'react-router-dom';

const DatasetDescription: React.FC<DatasetsType> = ({ name, description, created_at, updated_at, model_id, dataset_url }) => {
	return (
		<Box sx={{
			marginTop: '30px',
		}}>
			<Typography sx={{
				marginTop: '30px',
			}} variant="h4" gutterBottom>
				{name}
			</Typography>
			<Card>
				<CardContent>
					<Typography>
						Описание: {description || 'Описание отсутствует'}
					</Typography>
					<Typography>
						Создан: <strong>{new Date(created_at).toLocaleDateString()}</strong>
					</Typography>
					<Typography>
						Обновлен: <strong>{new Date(updated_at).toLocaleDateString()}</strong>
					</Typography>
					<Typography>
						<strong>Ссылка на датасет:</strong>
						<a href={dataset_url} target="_blank" rel="noopener noreferrer"> {dataset_url}</a>
					</Typography>
					<Typography>
						<strong>Ссылка на модель: </strong>
						<NavLink to={`/models/${model_id}`}>
							Модель {model_id}
						</NavLink>
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default DatasetDescription;