import { Navigate, useRoutes } from 'react-router';
import NotFound from './pages/NotFound.tsx';
import Home from './pages/Home.tsx';
import { useDispatch, useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage.tsx';
import Profile from './pages/Profile.tsx';
import Models from './pages/Models.tsx';
import { RootState } from './store';
import Chat from './pages/Chat.tsx';
import Datasets from './pages/Datasets.tsx';
import { useEffect, useState } from 'react';
import { checkAuth } from './utils/authUtils.ts';
import { login } from './store/slices/userSlice.ts';
import ModelInfo from './pages/Model.tsx';
import DatasetsId from './pages/DatasetsId.tsx';
import UpdateModelData from './pages/UpdateModelData.tsx';

export const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean, children: JSX.Element }) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const authenticate = async () => {
			await checkAuth(dispatch, login);
			setLoading(false);
		};

		authenticate();
	}, []);

	if (loading) {
		return <div>Загрузка...</div>; // Можно заменить на Skeleton или Spinner
	}

	if (!isAuth) {
		return <Navigate to="/login" />;
	}

	return children;
};


export const Routes = () => {
	const isAuth = useSelector((state: RootState) => state.user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		const authenticate = async () => {
			await checkAuth(dispatch, login);
		};

		authenticate();
	}, [dispatch]);


	return useRoutes([
		{ path: '*', element: <ProtectedRoute isAuth={isAuth}><Navigate to="/404"/></ProtectedRoute> },
		{ path: '/', element: <Home/> },
		{ path: '/login', element: <AuthPage type="login"/> },
		{ path: '/register', element: <AuthPage type="register"/> },
		{ path: '/models', element: <Models /> },
		{ path: '/models/:id', element: <ModelInfo /> },
		{ path: '/profile', element: <ProtectedRoute isAuth={isAuth}><Profile/></ProtectedRoute> },
		{ path: '/chat', element: <ProtectedRoute isAuth={isAuth}><Chat/></ProtectedRoute> },
		{ path: '/chat/:id', element: <ProtectedRoute isAuth={isAuth}><Chat/></ProtectedRoute> },
		{ path: '/datasets', element: <Datasets/> },
		{ path: '/datasets/:id', element: <DatasetsId/> },
		{ path: '/update-model/:id', element: <UpdateModelData/> },
		{ path: '/404', element: <NotFound/> },
	]);
};