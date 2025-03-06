import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect } from 'react';
import { fetchModelsList } from '../../store/slices/modelsSlice.ts';
import SidebarModel from './sidebar/SidebarModel.tsx';
import { NavLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ChatSidebar = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { models, loading } = useSelector((state: RootState) => state.models);

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	if (loading) {
		return <CircularProgress/>;
	}

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			padding: '20px',
			maxHeight: '100vh',
			overflow: 'hidden',
			backgroundColor: '#00000033',
		}}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				height: '100%',
				overflowY: 'auto',
				marginBottom: '20px',
			}}>
				<Typography>
					Доступные модели:
				</Typography>
				{
					models?.map((model) => (
						<SidebarModel key={model.id} item={model}/>
					))
				}
			</Box>
			<NavLink to={'/profile'}>
				<AccountCircleIcon sx={{
					width: '35px',
					height: '35px',
				}}/>
			</NavLink>
		</Box>
	);
};

export default ChatSidebar;