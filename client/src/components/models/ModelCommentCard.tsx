import React from 'react';
import { ModelCommentType } from '../../types/type.ts';
import { Box, Typography } from '@mui/material';

const ModelCommentCard: React.FC<ModelCommentType> = ({ content, created_at, user_id }) => {

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: 'white',
			border: '1px solid #e4e4e4',
			boxShadow: 1,
			padding: '10px 20px',
			borderRadius: '12px',
		}}>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				gap: '10px',
			}}>
				<Typography variant="body2" color="textSecondary" component="p">
					Пользователь: {user_id}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					{new Date(created_at).toLocaleDateString()}
				</Typography>
			</Box>
			<Box sx={{
				marginTop: '10px',
			}}>
				<Typography variant="body2" color="textSecondary" component="p">
					{content}
				</Typography>
			</Box>
		</Box>
	);
};

export default ModelCommentCard;