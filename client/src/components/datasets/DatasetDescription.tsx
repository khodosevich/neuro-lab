import { Box, Card, CardContent, Typography, Chip, Link, Divider, Stack, Button } from '@mui/material';
import { CalendarToday, Update, Link as LinkIcon, Description, Dataset, ModelTraining } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { DatasetsType } from '../../types/type.ts';
import React from 'react';

const DatasetDescription: React.FC<DatasetsType> = ({ name, description, created_at, updated_at, model_id, data_url }) => {
	return (
		<Box sx={{ mb: 4, mt: 4 }}>
			<Typography
				variant="h3"
				sx={{
					mb: 3,
					fontWeight: 700,
					color: 'secondary.main',
					textAlign: { xs: 'center', md: 'left' },
					display: 'flex',
					alignItems: 'center'
				}}
			>
				<Dataset sx={{ mr: 2, fontSize: '2.5rem' }} />
				{name}
			</Typography>

			<Card sx={{
				borderRadius: 3,
				boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
				transition: 'box-shadow 0.3s ease',
				'&:hover': {
					boxShadow: '0 12px 24px rgba(0,0,0,0.12)'
				}
			}}>
				<CardContent sx={{ p: 4 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
						<Description color="secondary" sx={{ mr: 1 }} />
						<Typography variant="h6" color="text.secondary">
							Описание датасета
						</Typography>
					</Box>

					<Typography
						paragraph
						sx={{
							fontSize: '1.1rem',
							lineHeight: 1.6,
							mb: 3,
							pl: 3,
							borderLeft: '3px solid',
							borderColor: 'secondary.light',
							backgroundColor: 'rgba(156, 39, 176, 0.05)',
							p: 2,
							borderRadius: 1,
							minHeight: '80px'
						}}
					>
						{description || (
							<Typography color="text.disabled">
								Описание отсутствует
							</Typography>
						)}
					</Typography>

					<Divider sx={{ my: 3 }} />

					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={{ xs: 1, sm: 4 }}
						divider={<Divider orientation="vertical" flexItem />}
						sx={{ mb: 2 }}
					>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<CalendarToday color="action" sx={{ mr: 1, fontSize: '1rem' }} />
							<Typography variant="body2">
								Создан: <strong>{new Date(created_at).toLocaleDateString()}</strong>
							</Typography>
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Update color="action" sx={{ mr: 1, fontSize: '1rem' }} />
							<Typography variant="body2">
								Обновлён: <strong>{new Date(updated_at).toLocaleDateString()}</strong>
							</Typography>
						</Box>
					</Stack>

					<Box sx={{ mt: 3 }}>
						<Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
							<LinkIcon sx={{ mr: 1, color: 'primary.main' }} />
							Связанные ресурсы:
						</Typography>

						<Stack spacing={2}>
							<Box>
								<Chip
									label="Исходный датасет"
									size="small"
									color="secondary"
									icon={<LinkIcon fontSize="small" />}
									sx={{ mb: 1 }}
								/>
								<Link
									href={data_url}
									target="_blank"
									rel="noopener noreferrer"
									sx={{
										display: 'block',
										textDecoration: 'none',
										'&:hover': {
											textDecoration: 'underline'
										},
										wordBreak: 'break-all'
									}}
								>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{data_url}
									</Typography>
								</Link>
							</Box>

							<Box>
								<Chip
									label="Связанная модель"
									size="small"
									color="primary"
									icon={<ModelTraining fontSize="small" />}
									sx={{ mb: 1, display: 'block', maxWidth: 'max-content' }}
								/>
								<Button
									component={NavLink}
									to={`/models/${model_id}`}
									variant="outlined"
									size="small"
									startIcon={<ModelTraining />}
									sx={{
										textTransform: 'none',
										color: 'primary.main'
									}}
								>
									Перейти к модели #{model_id}
								</Button>
							</Box>
						</Stack>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default DatasetDescription;