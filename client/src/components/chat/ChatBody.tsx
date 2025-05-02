import { Box, Typography, useTheme, Paper, Avatar, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotesPanel from './NotesPanel';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { keyframes } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { loadChatMessages, clearChat } from '../../store/slices/chatSlice.ts';

const fadeIn = keyframes`
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
`;

const ChatBody = ({ chatId }: { chatId: string }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery('(max-width: 600px)');
	const { models } = useSelector((state: RootState) => state.models);
	const { messages } = useSelector((state: RootState) => state.chat);
	const currentModel = models.find((model) => model.id === Number(chatId));
	const dispatch = useDispatch();

	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	useEffect(() => {
		// Загружаем сообщения при монтировании
		dispatch(loadChatMessages(chatId));

		// Очищаем чат при размонтировании
		return () => {
			dispatch(clearChat());
		};
	}, [chatId, dispatch]);

	return (
		<Box sx={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			overflow: 'hidden',
			backgroundColor: theme.palette.background.default,
		}}>
			<Paper sx={{
				p: isMobile ? 1 : 2,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				borderRadius: 0,
				boxShadow: theme.shadows[1],
				position: 'sticky',
				top: 0,
				zIndex: 1,
			}}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>
					<Avatar sx={{
						bgcolor: theme.palette.primary.light,
						width: isMobile ? 32 : 40,
						height: isMobile ? 32 : 40,
					}}>
						<PsychologyIcon fontSize={isMobile ? 'small' : 'medium'} />
					</Avatar>
					<Box>
						<Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={{ fontWeight: 600 }}>
							{currentModel?.name}
						</Typography>
						{!isMobile && (
							<Typography variant="body2" color="text.secondary">
								ID: {currentModel?.id}
							</Typography>
						)}
					</Box>
				</Box>
			</Paper>

			<Box sx={{
				flex: 1,
				p: isMobile ? 1 : 3,
				overflowY: 'auto',
				backgroundImage: theme.palette.mode === 'dark'
				                 ? 'linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01))'
				                 : 'linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01))',
			}}>
				{currentModel && <NotesPanel modelId={chatId} />}

				<Box sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					pt: 2,
				}}>
					{messages.map((message, index) => (
						<Box
							key={index}
							sx={{
								display: 'flex',
								justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
								animation: `${fadeIn} 0.3s ease-out`,
							}}
						>
							<Box
								sx={{
									maxWidth: isMobile ? '90%' : '70%',
									p: 2,
									borderRadius: 4,
									position: 'relative',
									backgroundColor: message.sender === 'user'
									                 ? theme.palette.primary.main
									                 : theme.palette.mode === 'dark'
									                   ? theme.palette.grey[800]
									                   : theme.palette.grey[100],
									color: message.sender === 'user'
									       ? theme.palette.primary.contrastText
									       : theme.palette.text.primary,
									boxShadow: theme.shadows[1],
									'&:before': {
										content: '""',
										position: 'absolute',
										width: 0,
										height: 0,
										[message.sender === 'user' ? 'right' : 'left']: -10,
										top: 12,
										borderStyle: 'solid',
										borderWidth: '10px 10px 10px 0',
										borderColor: message.sender === 'user'
										             ? `transparent ${theme.palette.primary.main} transparent transparent`
										             : theme.palette.mode === 'dark'
										               ? `transparent ${theme.palette.grey[800]} transparent transparent`
										               : `transparent ${theme.palette.grey[100]} transparent transparent`,
										transform: message.sender === 'user' ? 'none' : 'rotate(180deg)',
									},
								}}
							>
								<Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
									{message.text}
								</Typography>
								<Typography
									variant="caption"
									sx={{
										display: 'block',
										textAlign: message.sender === 'user' ? 'right' : 'left',
										mt: 1,
										color: message.sender === 'user'
										       ? 'rgba(255,255,255,0.7)'
										       : theme.palette.text.secondary,
									}}
								>
									{message.timestamp}
								</Typography>
							</Box>
						</Box>
					))}
					<div ref={messagesEndRef}/>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatBody;