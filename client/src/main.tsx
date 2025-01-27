import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { store } from '../store';
import { Routes } from './routes';
import { Box, CssBaseline } from '@mui/material';
import './styles/index.scss';
import Header from './components/Header.tsx';
import { Fragment } from 'react';

const Main = () => {
	const location = useLocation();
	const excludedRoutes = ['/auth/sign-in', '/auth/sign-up', '/404'];
	const isShowHeader = !excludedRoutes.includes(location.pathname);

	return (
		<Fragment>
			<Provider store={store}>
				<CssBaseline/>
				{isShowHeader && <Header/>}
				<Box className="container">
					<Routes/>
				</Box>
			</Provider>
		</Fragment>
	);
};

export default Main;