import { Box, Typography } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const ChatLanding = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				color: "gray",
				textAlign: "center",
			}}
		>
			<ChatBubbleOutlineIcon sx={{ fontSize: 80, color: "gray", mb: 2 }} />
			<Typography variant="h5" sx={{ fontWeight: "bold" }}>
				Выберите чат
			</Typography>
			<Typography variant="body1" sx={{ mt: 1, maxWidth: "400px" }}>
				Выберите модель из списка слева, чтобы начать новый разговор.
			</Typography>
		</Box>
	);
};

export default ChatLanding;
