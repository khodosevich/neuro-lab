import { Box, styled, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import ChatSidebar from '../components/chat/ChatSidebar.tsx';
import ChatBody from '../components/chat/ChatBody.tsx';
import ChatBottom from '../components/chat/ChatBottom.tsx';
import ChatLanding from '../components/chat/ChatLanding.tsx';

const ChatContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	height: '100vh',
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	overflow: 'hidden',
	flexDirection: 'row'
}));

const Chat = () => {
	const { id } = useParams();
	const isMobile = useMediaQuery('(max-width: 768px)');

	return (
		<ChatContainer>
			{(!isMobile || !id) && <ChatSidebar mobile={isMobile} />}

			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				position: 'relative'
			}}>
				{id ? (
					<>
						<ChatBody chatId={id.toString()} />
						<ChatBottom chatId={Number(id)} />
					</>
				) : (
					 <ChatLanding />
				 )}
			</Box>
		</ChatContainer>
	);
};

export default Chat;