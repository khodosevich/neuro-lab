import { Box, Typography } from '@mui/material';

const DatasetsNotFound = () => {
	return (
		<Box className="container" sx={{ textAlign: 'center', marginTop: 5 }}>
			<Typography variant="h4" color="error">
				Датасет не найден
			</Typography>
		</Box>
	);
};

export default DatasetsNotFound;