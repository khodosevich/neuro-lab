import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ChatBody = ({ chatId }: { chatId: string }) => {
	const { models } = useSelector((state: RootState) => state.models);
	const currentModel = models.find((model) => model.id === Number(chatId));

	return (
		<Box sx={{
			padding: '20px',
			display: 'flex',
			height: '100%',
		}}>
			<Box>
				<Typography variant="h6" sx={{ fontWeight: "bold" }}>
					{ currentModel?.name }
				</Typography>
			</Box>
		</Box>
	);
};

export default ChatBody;