import ChatSidebar from '../components/chat/ChatSidebar.tsx';
import ChatBody from '../components/chat/ChatBody.tsx';
import ChatBottom from '../components/chat/ChatBottom.tsx';
import { Box } from '@mui/material';

const Chat = () => {
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
				<ChatBody/>
				<ChatBottom/>
			</Box>
		</Box>
	);
};

export default Chat;