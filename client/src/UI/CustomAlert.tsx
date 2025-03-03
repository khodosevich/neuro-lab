import { Snackbar, Alert } from '@mui/material';
import { AlertDate } from '../types/type.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { hideAlert } from '../store/slices/alertSlice.ts';

const CustomAlert = () => {
	const { isShowAlert, message, type }: AlertDate = useSelector((state: RootState) => state.alert);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(hideAlert());
	};

	return (
		<Snackbar
			open={isShowAlert}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			sx={{ width: '100%' }}
		>
			<Alert
				variant="filled"
				severity={type}
				onClose={handleClose}
				sx={{ width: '100%', maxWidth: 'calc(100% - 40px)' }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default CustomAlert;