import { Box, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const ChatBottom = ({ chatId }: { chatId: string }) => {
	return (
		<Box sx={{
			margin: '20px',
		}}>
			<Box sx={{
				display: 'flex', alignItems: 'center', justifyContent: 'space-between',
				backgroundColor: '#00000033', padding: '20px', borderRadius: '20px',

			}}>
				<Box sx={{
					display: 'flex', alignItems: 'center', gap: '20px',
					width: '100%', paddingRight: '10px',
				}}>
					<AddPhotoAlternateIcon sx={{
						width: '35px',
						height: '35px',
					}}/>
					<TextField
						fullWidth
						label="Введите сообщение"
						variant="outlined"
						sx={{
							backgroundColor: '#2a2a2a',
							borderRadius: '5px',
							input: {
								color: 'white',
							},
							label: {
								color: 'white',
								'&.Mui-focused': {
									color: '#8a8a8a',
								},
							},
						}}
					/>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<SendIcon/>
				</Box>
			</Box>
		</Box>
	);
};

export default ChatBottom;