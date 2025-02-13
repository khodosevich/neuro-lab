import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, useTheme, CardContent,
	Typography, TextField, CardActions, Button, Snackbar } from '@mui/material';
import { RootState } from '../../../store';
import { useState } from 'react';
import { methods } from '../../api/methods.ts';
import { logout } from '../../../store/actios-creators/userAction.ts';

const Profile = () => {
	const user = useSelector((state: RootState) => state.user.user);
	const theme = useTheme();
	const dispatch = useDispatch();
	const [username, setUsername] = useState(user.username);
	const [email, setEmail] = useState(user.email);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleUpdateProfile = () => {
		console.log('Profile updated:', { username, email });
		setSnackbarOpen(true);
	};

	const handleDeleteAccount = async () => {
		try {
			const response = await methods.auth.deleteUser(user.userId)

			if (response?.status === 200) {
				dispatch(logout());
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<Box sx={{ backgroundColor: theme.palette.background.default }}>
			<Box className="container">
				<Box sx={{ maxWidth: 400, paddingTop: 4 }}>
					<Card>
						<CardContent>
							<Typography variant="h5" component="div" gutterBottom>
								Profile
							</Typography>
							<TextField
								label="Username"
								variant="outlined"
								fullWidth
								margin="normal"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
							<TextField
								label="Email"
								variant="outlined"
								fullWidth
								margin="normal"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</CardContent>
						<CardActions>
							<Button variant="contained" color="primary" onClick={handleUpdateProfile}>
								Update Profile
							</Button>
							<Button variant="contained" color="secondary" onClick={handleDeleteAccount}>
								Delete Account
							</Button>
						</CardActions>
					</Card>
					<Snackbar
						open={snackbarOpen}
						autoHideDuration={3000}
						onClose={handleCloseSnackbar}
						message="Profile updated successfully!"
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default Profile;