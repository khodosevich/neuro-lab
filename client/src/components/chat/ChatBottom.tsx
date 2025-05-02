import { Box, TextField, useTheme, IconButton, Paper, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { sendUserMessage, saveBotMessage } from '../../store/slices/chatSlice.ts';
import { useState, KeyboardEvent } from 'react';
import { methods } from '../../api/methods.ts';

const ChatBottom = ({ chatId }: { chatId: number }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery('(max-width: 600px)');
	const dispatch = useDispatch();
	const [message, setMessage] = useState('');
	const { user } = useSelector((state: RootState) => state.user);

	const handleSend = async () => {
		if (!message.trim() || !user) return;

		try {
			// Сохраняем сообщение пользователя
			await dispatch(sendUserMessage({
				chat_id: chatId.toString(),
				sender: 'user',
				text: message.trim(),
				model_id: chatId,
				user_id: user.id
			})).unwrap();

			setMessage('');

			// Отправляем запрос к модели
			const response = await methods.chat.newFetchToModel({
				modelId: chatId,
				inputText: message.trim(),
				chatId: chatId.toString(),
				userId: user.id
			});

			// Сохраняем ответ бота
			await dispatch(saveBotMessage({
				chat_id: chatId.toString(),
				sender: 'bot',
				text: response.data.output,
				model_id: chatId,
				user_id: user.id
			})).unwrap();

		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
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
					<IconButton size={isMobile ? "small" : "medium"}>
						<AttachFileIcon fontSize={isMobile ? "small" : "medium"} />
					</IconButton>
				)}

				<TextField
					fullWidth
					placeholder="Введите сообщение..."
					variant="outlined"
					size={isMobile ? "small" : "medium"}
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					multiline
					maxRows={4}
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
					onClick={handleSend}
					disabled={!message.trim()}
				>
					<SendIcon fontSize={isMobile ? "small" : "medium"} />
				</IconButton>
			</Box>
		</Paper>
	);
};

export default ChatBottom;