import { Box, Typography, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { methods } from "../api/methods.ts";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AlertType, UserCredentials, UserProfile } from "../types/type.ts";
import { jwtDecode } from "jwt-decode";
import CustomInput from "../UI/CustomInput.tsx";
import { CustomButton } from "../UI/CustomButton.tsx";
import { showAlert } from "../store/slices/alertSlice.ts";
import { login } from "../store/slices/userSlice.ts";
import { AppDispatch } from "../store";

const AuthPage = ({ type }: { type: "login" | "register" }) => {
	const theme = useTheme();
	const isLogin = type === "login";
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const [userFormData, setUserFormData] = useState<UserCredentials>({
		email: "",
		password: "",
		username: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const authHandler = async (e: FormEvent) => {
		e.preventDefault();
		const method = isLogin ? methods.auth.login : methods.auth.register;

		try {
			const response = await method(userFormData);
			if (!response || (isLogin && response.status !== 200)) return;

			const userData: UserProfile = jwtDecode(response.data.accessToken);
			localStorage.setItem("accessToken", response.data.accessToken);
			localStorage.setItem("refreshToken", response.data.refreshToken);
			dispatch(login(userData));

			dispatch(
				showAlert({
					isShowAlert: true,
					message: isLogin ? "Вход совершен успешно" : "Регистрация успешна",
					type: AlertType.SUCCESS,
				})
			);

			navigate("/chat");
		} catch (error: any) {
			const errorMessage = error.response?.data?.error || "Произошла ошибка";
			dispatch(
				showAlert({
					isShowAlert: true,
					message: errorMessage,
					type: AlertType.ERROR,
				})
			);
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				minHeight: "100vh",
				backgroundColor: theme.palette.background.default,
				p: 2,
			}}
		>
			<Box
				sx={{
					width: "100%",
					maxWidth: 500,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					p: { xs: 3, sm: 4 },
					borderRadius: 4,
					boxShadow: theme.shadows[4],
					backgroundColor: theme.palette.background.paper,
				}}
			>
				<Typography
					variant="h4"
					sx={{
						textAlign: "center",
						mb: 3,
						color: theme.palette.text.primary,
						fontWeight: 600,
					}}
				>
					{isLogin ? "Вход в систему" : "Создать аккаунт"}
				</Typography>

				<Box
					component="form"
					onSubmit={authHandler}
					sx={{
						width: "100%",
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						mb: 2,
					}}
				>
					<CustomInput
						label="Email"
						placeholder="Введите email"
						type="email"
						name="email"
						onChange={handleChange}
						value={userFormData.email}
						required
						fullWidth
					/>

					{!isLogin && (
						<CustomInput
							label="Имя пользователя"
							placeholder="Введите имя"
							type="text"
							name="username"
							onChange={handleChange}
							value={userFormData.username}
							required
							fullWidth
						/>
					)}

					<CustomInput
						label="Пароль"
						placeholder="Введите пароль"
						type="password"
						name="password"
						onChange={handleChange}
						value={userFormData.password}
						required
						fullWidth
					/>

					<CustomButton
						type="submit"
						fullWidth
						sx={{
							mt: 2,
							py: 1.5,
						}}
					>
						{isLogin ? "Войти" : "Зарегистрироваться"}
					</CustomButton>
				</Box>

				<Typography
					variant="body2"
					sx={{
						color: theme.palette.text.secondary,
						textAlign: "center",
					}}
				>
					{isLogin ? "Ещё нет аккаунта?" : "Уже есть аккаунт?"}{' '}
					<NavLink
						to={isLogin ? "/register" : "/login"}
						style={{
							color: theme.palette.primary.main,
							textDecoration: "none",
							fontWeight: 500,
							'&:hover': {
								textDecoration: "underline",
							}
						}}
					>
						{isLogin ? "Зарегистрироваться" : "Войти"}
					</NavLink>
				</Typography>
			</Box>
		</Box>
	);
};

export default AuthPage;