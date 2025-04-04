import ChatSidebar from '../components/chat/ChatSidebar.tsx';
import ChatBody from '../components/chat/ChatBody.tsx';
import ChatBottom from '../components/chat/ChatBottom.tsx';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ChatLanding from '../components/chat/ChatLanding.tsx';

const Chat = () => {
	const { id } = useParams();

	return (
		<Box sx={{
			display: 'flex',
			width: '100%',
			height: '100%',
			backgroundColor: '#2a2a2a',
			color: 'white',
		}}>
			<ChatSidebar/>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100%',
			}}>
				{
					id ? <>
						   <ChatBody chatId={id.toString()}/>
						   <ChatBottom chatId={id.toString()}/>
					   </> : <ChatLanding/>
				}
			</Box>
		</Box>
	);
};

export default Chat;