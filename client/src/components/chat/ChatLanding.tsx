import { Box, Typography, useTheme, Button, useMediaQuery } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PsychologyIcon from '@mui/icons-material/Psychology';

const ChatLanding = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery('(max-width: 600px)');

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				textAlign: "center",
				p: isMobile ? 2 : 4,
				backgroundColor: theme.palette.background.default
			}}
		>
			<PsychologyIcon sx={{
				fontSize: isMobile ? 60 : 80,
				color: theme.palette.primary.main,
				mb: 2
			}} />
			<Typography variant={isMobile ? "h5" : "h4"} sx={{
				fontWeight: 600,
				mb: 2,
				color: theme.palette.text.primary
			}}>
				Выберите модель для общения
			</Typography>
			<Typography variant="body1" sx={{
				mb: 4,
				maxWidth: "500px",
				color: theme.palette.text.secondary,
				fontSize: isMobile ? '0.875rem' : '1rem'
			}}>
				Выберите нейронную модель из списка слева, чтобы начать интерактивный диалог и получить предсказания.
			</Typography>
			<Button
				variant="contained"
				startIcon={<ChatBubbleOutlineIcon />}
				sx={{
					borderRadius: 4,
					px: 4,
					py: isMobile ? 1 : 1.5,
					fontSize: isMobile ? '0.875rem' : '1rem'
				}}
			>
				Начать разговор
			</Button>
		</Box>
	);
};

export default ChatLanding;