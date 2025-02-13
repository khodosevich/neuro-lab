import { Alert } from '@mui/material';
import { AlertDate } from '../types/type.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const CustomAlert = () => {
	const alert: AlertDate = useSelector((state: RootState) => state.alert);

	return (
		alert.isShowAlert && <Alert variant="filled" severity={ alert.type }>
			{ alert.message }
		</Alert>
	);
};

export default CustomAlert;