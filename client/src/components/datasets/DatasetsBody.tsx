import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { methods } from '../../api/methods.ts';
import { DataGrid } from '@mui/x-data-grid';

const DatasetsBody = () => {
	const [items, setItems] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await methods.datasets.getList();
				console.log(response.data);
				setItems(response.data);
			} catch (e) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const columns = [
		{ field: 'ticket_id', headerName: 'ID', width: 90 },
		{ field: 'title', headerName: 'Название', width: 340 },
		{ field: 'description', headerName: 'Описание', width: 400 },
		{ field: 'category', headerName: 'Категория', width: 200 },
		{ field: 'priority', headerName: 'Приоритет', width: 200 },
		{ field: 'assignee_id', headerName: 'Исполнитель', width: 130 },
	];

	if (loading) return <Typography>Загрузка...</Typography>;
	if (error) return <Typography>Ошибка при загрузке данных</Typography>;

	return (
		<Box>
			<Typography>Датасет имеет следующуу структуру:</Typography>
			<Paper sx={{ height: 600, width: '100%', padding: 2, marginBlock: 2 }}>
				<DataGrid
					rows={items}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { pageSize: 10, page: 0 },
						},
					}}
					pageSizeOptions={[5, 10, 25, 50]}
					getRowId={(row) => row.ticket_id}
				/>
			</Paper>
		</Box>
	);
};

export default DatasetsBody;