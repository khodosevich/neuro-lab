import {
	Card,
	CardContent,
	Typography,
	Avatar,
	Box,
	Chip,
	IconButton,
	Menu,
	MenuItem,
	CircularProgress,
} from '@mui/material';
import {
	Person,
	CalendarToday,
	MoreVert,
	Delete,
} from '@mui/icons-material';
import { ModelCommentType } from '../../types/type.ts';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useState } from 'react';
import { methods } from '../../api/methods.ts';
import { useDispatch } from 'react-redux';
import { setUpdateComments } from '../../store/slices/modelsSlice.ts';

const ModelCommentCard = (comment: ModelCommentType) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const dispatch = useDispatch();

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			const response = await methods.model.comment.deleteComment(comment.id);
			dispatch(setUpdateComments(response.data));
		}
		catch (error) {
			console.error('Error deleting comment:', error);
		}
		finally {
			setIsDeleting(false);
			handleMenuClose();
		}
	};

	return (
		<Card sx={{
			borderRadius: 3,
			boxShadow: 'none',
			border: '1px solid',
			borderColor: 'divider',
			position: 'relative',
			'&:hover': {
				boxShadow: 1,
			},
		}}>
			<CardContent sx={{ p: 3 }}>
				<Box sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					mb: 2,
				}}>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Avatar sx={{ width: 40, height: 40, mr: 2 }}>
							<Person/>
						</Avatar>

						<Box>
							<Typography variant="subtitle1" fontWeight="medium">
								{comment.username}
							</Typography>

							<Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
								<CalendarToday sx={{
									fontSize: '0.8rem',
									mr: 0.5,
									color: 'text.secondary',
								}}/>

								<Typography variant="caption" color="text.secondary">
									{formatDistanceToNow(new Date(comment.created_at), {
										addSuffix: true,
										locale: ru,
									})}
								</Typography>

								{comment.created_at !== comment.updated_at && (
									<Chip
										label="Изменён"
										size="small"
										sx={{ ml: 1 }}
									/>
								)}
							</Box>
						</Box>
					</Box>

					<IconButton
						size="small"
						onClick={handleMenuOpen}
						aria-label="comment actions"
					>
						<MoreVert/>
					</IconButton>
				</Box>

				<Menu
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={handleMenuClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
				>
					<MenuItem onClick={handleDelete} disabled={isDeleting}>
						{isDeleting ? (
							<CircularProgress size={20} sx={{ mr: 1 }}/>
						) : (
							 <Delete fontSize="small" sx={{ mr: 1 }}/>
						 )}
						Удалить
					</MenuItem>
				</Menu>

				<Typography variant="body1" sx={{
					whiteSpace: 'pre-line',
					pl: 6,
				}}>
					{comment.content}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ModelCommentCard;