import { Box, Typography } from '@mui/material';
import landingImg from '../assets/ai.jpg';
import { CustomButton } from '../UI/CustomButton.tsx';
import { NavLink } from 'react-router-dom';

const Landing = () => {

	return (
		<Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" ,
			gap: "20px", paddingBlock: "60px", alignItems: "center",
		}}>
			<Box sx={{ maxWidth: "600px" }}>
				<Typography sx={{ fontSize: "38px" }} variant="h1" color="textSecondary">
					Веб-платформа для работы с моделями нейронных сетей
				</Typography>
				<Typography sx={{
					marginTop: "10px"
				}} variant="body1" color="textSecondary">
					Данная платформа упрощает процесс обучения и развертывания нейронных моделей,
					предоставление пользователям инструментов, необходимых для эффективного использования возможностей машинного обучения.
				</Typography>
				<CustomButton sx={{ marginTop: "20px", padding: 0 }}>
					<NavLink style={{ display: "flex", paddingBlock: "14px",
						alignItems: "center", justifyContent: "center",
					}} to='/login'>
						Попробовать
					</NavLink>
				</CustomButton>
			</Box>
			<Box sx={{ borderRadius: "20px", overflow: "hidden", width: "100%", height: "100%" }}>
				<img style={{ objectFit: "cover" }} src={landingImg} alt="ai" width="100%" height="100%"/>
			</Box>
		</Box>
	);
};

export default Landing;