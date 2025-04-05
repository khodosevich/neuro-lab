import { Box, Paper, Button, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { methods } from '../api/methods.ts';
import { AlertType, UserType } from '../types/type.ts';
import { showAlert } from '../store/slices/alertSlice.ts';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Admin = () => {
	const [users, setUsers] = useState<UserType[]>([
		{
			id: 0,
			username: '',
			email: '',
			role: '',
			created_at: '',
		},
	]);

	const dispatch = useDispatch();
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await methods.user.getUsers();

				setUsers(response.data);

				dispatch(
					showAlert({
						isShowAlert: true,
						message: 'Пользователи получены успешно',
						type: AlertType.SUCCESS,
					}),
				);
			}
			catch (error) {
				dispatch(
					showAlert({
						isShowAlert: true,
						message: error.response.data.error,
						type: AlertType.SUCCESS,
					}),
				);
			}
		};

		fetchUsers();
	}, []);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', flex: 0, minWidth: 100,},
		{ field: 'username', headerName: 'Username', flex: 2, minWidth: 300, },
		{ field: 'email', headerName: 'Email', flex: 2, minWidth: 300,},
		{ field: 'role', headerName: 'Role', flex: 1, minWidth: 140, },
		{
			field: 'created_at', headerName: 'Created_at', flex: 1,
			minWidth: 150,
			valueGetter: (params) => {
				const date = new Date(params);
				return date.toLocaleDateString('ru-RU');
			},
		},
		{
			field: 'actions',
			headerName: 'Действия',
			minWidth: 370,
			sortable: false,
			filterable: false,
			align: 'center',
			renderCell: (params) => {
				const user = params.row;
				const isAdmin = user.role === 'admin';

				const handleDelete = async () => {
					try {
						await methods.user.deleteUser(user.id);
						setUsers(prev => prev.filter(u => u.id !== user.id));
						dispatch(showAlert({ isShowAlert: true, message: 'Пользователь удален', type: AlertType.SUCCESS }));
					}
					catch (err) {
						dispatch(showAlert({ isShowAlert: true, message: 'Ошибка удаления', type: AlertType.ERROR }));
					}
				};

				const handleUpdateRole = async () => {
					const newRole = isAdmin ? 'user' : 'admin';

					try {
						await methods.user.updateUserRole(user.id, newRole);

						setUsers(prev =>
							prev.map(u => u.id === user.id ? { ...u, role: newRole } : u),
						);
						dispatch(showAlert({ isShowAlert: true, message: 'Права обновлены', type: AlertType.SUCCESS }));
					}
					catch (err) {
						dispatch(showAlert({ isShowAlert: true, message: 'Ошибка обновления', type: AlertType.ERROR }));
					}
				};

				return (
					<Box sx={{
						display: 'flex',
						gap: '10px',
						height: '100%',
						alignItems: 'center'
					}}>
						<Button
							variant="contained"
							color="error"
							size="small"
							startIcon={<DeleteIcon/>}
							onClick={handleDelete}
						>
							Удалить
						</Button>
						<Button
							variant="contained"
							color="primary"
							size="small"
							startIcon={<AdminPanelSettingsIcon/>}
							onClick={handleUpdateRole}
						>
							Сделать
							{
								isAdmin ? " пользователем" : " админом"
							}
						</Button>
					</Box>
				);
			},
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	return (
		<Box className="container" mt={4}>
			<Typography variant="h4">
				Список пользователей платформы:
			</Typography>
			<Paper sx={{ width: '100%', overflowX: 'auto', marginTop: 4 }}>
				<Box sx={{ minWidth: '800px' }}>
					<DataGrid
						rows={users}
						columns={columns}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[5, 10]}
						autoHeight
						sx={{ border: 0 }}
					/>
				</Box>
			</Paper>
		</Box>

	);
};

export default Admin;