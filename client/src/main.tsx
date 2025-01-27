import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { store } from '../store';
import { Routes } from './routes';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import './styles/base.scss';
import Header from './components/Header.tsx';
import { Fragment, useState } from 'react';
import { darkTheme, lightTheme } from './theme.ts';

const Main = () => {
	const location = useLocation();
	const excludedRoutes = ['/auth/sign-in', '/auth/sign-up', '/404'];
	const isShowHeader = !excludedRoutes.includes(location.pathname);

	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<Fragment>
			<Provider store={store}>
				<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
					<CssBaseline/>
					{isShowHeader && <Header onToggleTheme={ toggleTheme } isDarkMode={ isDarkMode }/>}
					<Box className="container">
						<Routes/>
					</Box>
				</ThemeProvider>
			</Provider>
		</Fragment>
	);
};

export default Main;