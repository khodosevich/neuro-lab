import { Box, TextField, useTheme, IconButton, Paper, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDispatch } from 'react-redux';
import { addBotMessage, addUserMessage } from '../../store/slices/chatSlice.ts';
import { useState } from 'react';
import { methods } from '../../api/methods.ts';

const ChatBottom = ({ chatId }: { chatId: number }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery('(max-width: 600px)');
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');

	const handleSend = async () => {
		if (!message.trim()) return;

		dispatch(addUserMessage(message.trim()));
		setMessage('');

		try {
			const response = await methods.chat.newFetchToModel({ modelId: chatId, inputText: message });
			dispatch(addBotMessage(response.data.output));
		} catch (error) {
			console.error(error);
			dispatch(addBotMessage("Произошла ошибка при обработке запроса"));
		}
	};

	return (
		<Paper sx={{
			p: isMobile ? 0.5 : 1,
			borderRadius: 4,
			m: isMobile ? 1 : 2,
			boxShadow: theme.shadows[3],
			position: 'sticky',
			bottom: 0
		}}>
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 0.5
			}}>
				{!isMobile && (
					<>
						<IconButton size={isMobile ? "small" : "medium"}>
							<AttachFileIcon fontSize={isMobile ? "small" : "medium"} />
						</IconButton>
					</>
				)}

				<TextField
					fullWidth
					placeholder="Введите сообщение..."
					variant="outlined"
					size={isMobile ? "small" : "medium"}
					value={message}
					onChange={e => setMessage(e.target.value)}
					sx={{
						'& .MuiOutlinedInput-root': {
							borderRadius: 4,
							backgroundColor: theme.palette.background.paper
						}
					}}
				/>

				<IconButton
					color="primary"
					sx={{ ml: 1 }}
					size={isMobile ? "small" : "medium"}
					onClick={() => {handleSend()}}
				>
					<SendIcon fontSize={isMobile ? "small" : "medium"} />
				</IconButton>
			</Box>
		</Paper>
	);
};

export default ChatBottom;