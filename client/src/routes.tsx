import { Navigate, useRoutes } from 'react-router';
import NotFound from './pages/404';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import AuthPage from './pages/auth/AuthPage';

export const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean, children: JSX.Element }) => {
	if (!isAuth) {
		return <Navigate to="/auth/sign-in"/>;
	}

	return children;
};

export const Routes = () => {
	const isAuth = useSelector((state: any) => state.user.isAuth);

	let routes = useRoutes([
		{ path: '*', element: <ProtectedRoute isAuth={isAuth}><Navigate to="/404"/></ProtectedRoute> },
		{ path: '/', element: <Home/> },
		{ path: '/auth/sign-in', element: <AuthPage type="sign-in"/> },
		{ path: '/auth/sign-up', element: <AuthPage type="sign-up"/> },
		{ path: '/404', element: <NotFound/> },
	]);

	return routes;
};