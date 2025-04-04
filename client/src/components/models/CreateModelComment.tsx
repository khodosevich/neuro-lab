import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { methods } from '../../api/methods.ts';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setUpdateComments } from '../../store/slices/modelsSlice.ts';

const CreateModelComment = ({ modelId }: { modelId: string }) => {

	const [comment, setComment] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.user.user);
	const dispatch = useDispatch();

	const handleSubmit = async () => {

		setLoading(true);
		setError('');

		if (!comment) return;

		try {
			const response = await methods.model.comment.createComment({ modelId: Number(modelId), userId: user?.id, content: comment });
			dispatch(setUpdateComments(response.data));
		}
		catch {
			setError('Ошибка отправки комментария');
		}
		finally {
			setLoading(false);
		}
	};

	return (
		<Box sx={{
			marginBlock: '20px',
			display: 'flex',
			flexDirection: 'column',
			maxWidth: '400px',
		}}>
			<TextField
				label="Ваш комментарий"
				variant="outlined"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				error={!!error}
				helperText={error}
			/>
			<Button
				sx={{
					marginTop: '20px',
				}}
				variant="contained"
				color="primary"
				onClick={handleSubmit}
				disabled={loading || !comment.trim()}
			>
				{loading ? <CircularProgress size={24}/> : 'Отправить'}
			</Button>
		</Box>
	);
};

export default CreateModelComment;