import { Navigate, useRoutes } from 'react-router';
import NotFound from './pages/404';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import AuthPage from './pages/auth/AuthPage';
import Profile from './pages/profile/Profile.tsx';
import Models from './pages/models/Models.tsx';
import { RootState } from '../store';

export const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean, children: JSX.Element }) => {
	if (!isAuth) {
		return <Navigate to="/auth/sign-in"/>;
	}

	return children;
};

export const Routes = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);

	return useRoutes([
		{ path: '*', element: <ProtectedRoute isAuth={isAuth}><Navigate to="/404"/></ProtectedRoute> },
		{ path: '/', element: <Home/> },
		{ path: '/auth/sign-in', element: <AuthPage type="sign-in"/> },
		{ path: '/auth/sign-up', element: <AuthPage type="sign-up"/> },
		{ path: '/models', element: <Models /> },
		{ path: '/profile', element: <ProtectedRoute isAuth={isAuth}><Profile/></ProtectedRoute> },
		{ path: '/404', element: <NotFound/> },
	]);
};