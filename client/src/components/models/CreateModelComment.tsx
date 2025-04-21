import {
	Box,
	TextField,
	Button,
	CircularProgress,
	Avatar,
	Typography,
	Paper,
	Divider,
	IconButton,
} from '@mui/material';
import { useState } from 'react';
import { methods } from '../../api/methods.ts';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateComments } from '../../store/slices/modelsSlice.ts';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

const CreateModelComment = ({ modelId }: { modelId: string }) => {
	const [comment, setComment] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();

	const handleSubmit = async () => {
		if (!comment.trim()) {
			setError('Комментарий не может быть пустым');
			return;
		}

		setLoading(true);
		setError('');

		try {
			const response = await methods.model.comment.createComment({
				modelId: Number(modelId),
				userId: user?.id,
				content: comment,
			});

			dispatch(setUpdateComments(response.data));
			setComment('');
		}
		catch (err) {
			setError('Ошибка отправки комментария');
		}
		finally {
			setLoading(false);
		}
	};

	const handleClear = () => {
		setComment('');
		setError('');
	};

	return (
		<Paper elevation={3} sx={{
			p: 3,
			mb: 4,
			borderRadius: 3,
			backgroundColor: 'background.paper',
		}}>
			<Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
				<Avatar
					sx={{ width: 32, height: 32, mr: 1.5 }}
				/>
				Добавить комментарий
			</Typography>

			<Divider sx={{ mb: 3 }}/>

			<TextField
				fullWidth
				multiline
				minRows={3}
				maxRows={6}
				variant="outlined"
				label="Ваш комментарий"
				value={comment}
				onChange={(e) => {
					setComment(e.target.value);
					setError('');
				}}
				error={!!error}
				helperText={error}
				sx={{ mb: 2 }}
			/>

			<Box sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				gap: 2,
			}}>
				{comment && (
					<IconButton
						onClick={handleClear}
						color="error"
						sx={{
							borderRadius: 2,
							border: '1px solid',
							borderColor: 'divider',
						}}
					>
						<ClearIcon/>
					</IconButton>
				)}

				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					disabled={loading || !comment.trim()}
					endIcon={loading ? <CircularProgress size={20}/> : <SendIcon/>}
					sx={{
						borderRadius: 2,
						px: 3,
						py: 1,
						textTransform: 'none',
						minWidth: '120px',
					}}
				>
					{loading ? 'Отправка...' : 'Отправить'}
				</Button>
			</Box>
		</Paper>
	);
};

export default CreateModelComment;