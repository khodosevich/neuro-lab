import { Box, Typography, useTheme, Avatar, List, ListItem,
	ListItemAvatar, ListItemText, Divider, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useEffect } from 'react';
import { fetchModelsList } from '../../store/slices/modelsSlice.ts';
import { NavLink, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Skeleton from '@mui/material/Skeleton';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const ChatSidebar = ({ mobile = false }: { mobile?: boolean }) => {
	const theme = useTheme();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const isSmallScreen = useMediaQuery('(max-width:600px)');
	const { models, loading } = useSelector((state: RootState) => state.models);

	useEffect(() => {
		dispatch(fetchModelsList());
	}, [dispatch]);

	const handleCloseSidebar = () => {
		navigate(-1);
	};

	return (
		<Box sx={{
			width: mobile ? '100%' : 300,
			minWidth: mobile ? 'unset' : 300,
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			borderRight: mobile ? 'none' : `1px solid ${theme.palette.divider}`,
			backgroundColor: theme.palette.background.paper,
			position: mobile ? 'fixed' : 'relative',
			zIndex: mobile ? 1300 : 'auto',
			left: 0,
			top: 0
		}}>
			{/* Шапка сайдбара */}
			<Box sx={{
				p: mobile ? 2 : 3,
				borderBottom: `1px solid ${theme.palette.divider}`,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
				<Typography variant="h6" sx={{ fontWeight: 600 }}>
					Доступные модели
				</Typography>
				{mobile && (
					<IconButton onClick={handleCloseSidebar}>
						<CloseIcon />
					</IconButton>
				)}
			</Box>

			{/* Список моделей */}
			<Box sx={{
				flex: 1,
				overflowY: 'auto',
				px: mobile ? 1 : 0
			}}>
				{loading ? (
					<Box sx={{ p: 2 }}>
						{[...Array(5)].map((_, i) => (
							<Skeleton
								key={i}
								variant="rectangular"
								height={mobile ? 60 : 72}
								sx={{
									mb: 1,
									borderRadius: 1
								}}
							/>
						))}
					</Box>
				) : (
					 <List dense={isSmallScreen}>
						 {models?.map((model) => (
							 <ListItem
								 key={model.id}
								 component={NavLink}
								 to={`/chat/${model.id}`}
								 sx={{
									 '&.active': {
										 backgroundColor: theme.palette.action.selected
									 },
									 py: mobile ? 1 : 1.5,
									 px: mobile ? 1 : 2
								 }}
							 >
								 <ListItemAvatar>
									 <Avatar sx={{
										 bgcolor: theme.palette.primary.light,
										 width: mobile ? 36 : 40,
										 height: mobile ? 36 : 40
									 }}>
										 <PsychologyIcon fontSize={mobile ? "small" : "medium"} />
									 </Avatar>
								 </ListItemAvatar>
								 <ListItemText
									 primary={
										 <Typography
											 variant={mobile ? "body2" : "body1"}
											 noWrap={mobile}
										 >
											 {model.name}
										 </Typography>
									 }
									 secondary={
										 model.description && (
											 <Typography
												 variant="caption"
												 noWrap
												 sx={{ display: mobile ? 'none' : 'block' }}
											 >
												 {model.description.substring(0, 50)}
												 {model.description.length > 50 ? '...' : ''}
											 </Typography>
										 )
									 }
								 />
							 </ListItem>
						 ))}
					 </List>
				 )}
			</Box>

			{/* Нижняя панель */}
			<Divider />
			<Box sx={{
				p: mobile ? 1 : 2,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}>
				<NavLink to="/">
					<Avatar sx={{
						bgcolor: theme.palette.grey[300],
						width: mobile ? 32 : 40,
						height: mobile ? 32 : 40
					}}>
						<HomeIcon fontSize={mobile ? "small" : "medium"} />
					</Avatar>
				</NavLink>
				<NavLink to="/profile">
					<Avatar sx={{
						bgcolor: theme.palette.grey[300],
						width: mobile ? 32 : 40,
						height: mobile ? 32 : 40
					}}>
						<AccountCircleIcon fontSize={mobile ? "small" : "medium"} />
					</Avatar>
				</NavLink>
			</Box>
		</Box>
	);
};

export default ChatSidebar;