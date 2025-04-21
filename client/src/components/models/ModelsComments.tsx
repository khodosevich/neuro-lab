import { useEffect, useState } from 'react';
import { methods } from '../../api/methods.ts';
import { Box, Typography, Divider, CircularProgress, IconButton } from '@mui/material';
import { ModelCommentType } from '../../types/type.ts';
import ModelCommentCard from './ModelCommentCard.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import RefreshIcon from '@mui/icons-material/Refresh';

const ModelsComments = ({ id }: { id: number }) => {
	const [comments, setComments] = useState<ModelCommentType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const { updateComments } = useSelector((state: RootState) => state.models);

	const loadComments = async () => {
		if (!id) return;

		setLoading(true);
		setError('');

		try {
			const response = await methods.model.comment.getComments({ modelId: id });
			setComments(response.data);
		} catch (err) {
			setError('Не удалось загрузить комментарии');
			console.error('Error fetching comments:', err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadComments();
	}, [updateComments]);

	return (
		<Box sx={{ mt: 4 }}>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				mb: 3
			}}>
				<Typography variant="h5" component="h3">
					Комментарии ({comments.length})
				</Typography>

				<IconButton
					onClick={loadComments}
					disabled={loading}
					color="primary"
					sx={{
						borderRadius: 2,
						backgroundColor: 'action.hover'
					}}
				>
					<RefreshIcon />
				</IconButton>
			</Box>

			<Divider sx={{ mb: 3 }} />

			{loading && comments.length === 0 ? (
				<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Typography color="error" sx={{ p: 2, textAlign: 'center' }}>
					{error}
				</Typography>
			) : comments.length === 0 ? (
				<Typography
					color="text.secondary"
					sx={{
						p: 3,
						textAlign: 'center',
						fontStyle: 'italic'
					}}
				>
					Комментариев пока нет. Будьте первым!
				</Typography>
			) : (
				    <Box sx={{
					    display: 'grid',
					    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
					    gap: 3,
					    mb: 4
				    }}>
					    {comments.map(comment => (
						    <ModelCommentCard key={comment.id.toString()} {...comment} />
					    ))}
				    </Box>
			    )}
		</Box>
	);
};

export default ModelsComments;