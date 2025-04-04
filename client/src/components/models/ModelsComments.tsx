import { useEffect, useState } from 'react';
import { methods } from '../../api/methods.ts';
import { Box } from '@mui/material';
import { ModelCommentType } from '../../types/type.ts';
import ModelCommentCard from './ModelCommentCard.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ModelsComments = ({ id }: { id: number }) => {
	const [comments, setComments] = useState<ModelCommentType[]>([
		{
			created_at: '',
			id: 0,
			model_id: 0,
			updated_at: '',
			user_id: 0,
			content: '',
		},
	]);

	const { updateComments } = useSelector((state: RootState) => state.models);

	useEffect(() => {
		const loadComments = async () => {
			if (!id) return;
			try {
				const response = await methods.model.comment.getComments({ modelId: id });
				setComments(response.data);
			}
			catch {
				console.log('error fetching comments', id);
			}
		};

		loadComments();
	}, [updateComments]);

	return (
		<Box sx={{
			display: 'grid',
			gridTemplateColumns: 'repeat(2, 1fr)',
			gap: '15px',
			marginBlock: '20px',
		}}>
			{
				comments?.length > 0 && comments.map(comment => (
					<ModelCommentCard key={comment.id.toString()} {...comment} />
				))
			}
		</Box>
	);
};

export default ModelsComments;