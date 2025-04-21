import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Link, Divider, Stack, } from '@mui/material';
import { CalendarToday, Update, Link as LinkIcon, Description, } from '@mui/icons-material';
import { ModelsData } from '../../types/type.ts';

const ModelDescription: React.FC<ModelsData> = ({ description, created_at, updated_at, dataset_url, model_url, name }) => {
	return (
		<Box sx={{ mb: 4, mt: 4 }}>
			<Typography
				variant="h3"
				sx={{
					mb: 3,
					fontWeight: 700,
					color: 'primary.main',
					textAlign: { xs: 'center', md: 'left' },
				}}
			>
				{name}
			</Typography>

			<Card sx={{
				borderRadius: 3,
				boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
				'&:hover': {
					boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
				},
			}}>
				<CardContent sx={{ p: 4 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
						<Description color="primary" sx={{ mr: 1 }}/>
						<Typography variant="h6" color="text.secondary">
							Описание модели
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
							borderColor: 'primary.light',
							backgroundColor: 'rgba(25, 118, 210, 0.05)',
							p: 2,
							borderRadius: 1,
						}}
					>
						{description}
					</Typography>

					<Divider sx={{ my: 3 }}/>

					<Stack
						direction={{ xs: 'column', sm: 'row' }}
						spacing={{ xs: 1, sm: 4 }}
						divider={<Divider orientation="vertical" flexItem/>}
						sx={{ mb: 2 }}
					>
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<CalendarToday color="action" sx={{ mr: 1, fontSize: '1rem' }}/>
							<Typography variant="body2">
								Создана: <strong>{new Date(created_at).toLocaleDateString()}</strong>
							</Typography>
						</Box>

						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<Update color="action" sx={{ mr: 1, fontSize: '1rem' }}/>
							<Typography variant="body2">
								Обновлена: <strong>{new Date(updated_at).toLocaleDateString()}</strong>
							</Typography>
						</Box>
					</Stack>

					<Box sx={{ mt: 3 }}>
						<Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
							<LinkIcon sx={{ mr: 1, color: 'secondary.main' }}/>
							Ресурсы:
						</Typography>

						<Stack spacing={1}>
							<Link
								href={dataset_url}
								target="_blank"
								rel="noopener noreferrer"
								sx={{
									display: 'flex',
									alignItems: 'center',
									textDecoration: 'none',
									'&:hover': {
										textDecoration: 'underline',
									},
								}}
							>
								<Chip
									label="Датасет"
									size="small"
									color="secondary"
									sx={{ mr: 1 }}
								/>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
								>
									{dataset_url}
								</Typography>
							</Link>

							<Link
								href={model_url}
								target="_blank"
								rel="noopener noreferrer"
								sx={{
									display: 'flex',
									alignItems: 'center',
									textDecoration: 'none',
									'&:hover': {
										textDecoration: 'underline',
									},
								}}
							>
								<Chip
									label="Модель"
									size="small"
									color="primary"
									sx={{ mr: 1 }}
								/>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
								>
									{model_url}
								</Typography>
							</Link>
						</Stack>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default ModelDescription;