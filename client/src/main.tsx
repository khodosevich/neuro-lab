import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Routes } from './routes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './styles/base.scss';
import Header from './components/Header.tsx';
import { useState } from 'react';
import { darkTheme, lightTheme } from './theme.ts';
import CustomAlert from './UI/CustomAlert.tsx';
import Footer from './components/Footer.tsx';
import { store } from './store';

const Main = () => {
	const location = useLocation();
	const excludedRoutes = ['/login', '/register', '/404'];
	const isShowHeader = !excludedRoutes.includes(location.pathname) && !location.pathname.startsWith('/chat');

	const [isDarkMode, setIsDarkMode] = useState(true);

	const toggleTheme = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<Provider store={store}>
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
				<CssBaseline/>
				<div className="page">
					{isShowHeader && <Header onToggleTheme={toggleTheme} isDarkMode={isDarkMode}/>}
					<main style={{ flexGrow: 1 }}>
						<Routes/>
					</main>
					{isShowHeader && <Footer/>}
				</div>
				<CustomAlert/>
			</ThemeProvider>
		</Provider>
	);
};

export default Main;