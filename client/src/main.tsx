import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../store';
import { Routes } from './routes';
import { Box, CssBaseline } from '@mui/material';
import './styles/index.scss';

const Main = () => {
	return (
		<BrowserRouter>
			<CssBaseline/>
			<Provider store={store}>
				<Box className="container">
					<Routes/>
				</Box>
			</Provider>
		</BrowserRouter>
	);
};

export default Main;
