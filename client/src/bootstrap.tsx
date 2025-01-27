import ReactDOM from 'react-dom/client';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<Main />
	</BrowserRouter>
);