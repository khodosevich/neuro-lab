import { Box, Typography } from "@mui/material";
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
				minHeight: "100%",
			}}
		>
			<Box
				sx={{
					maxWidth: 700,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					padding: '120px 64px',
					borderRadius: "32px",
					boxShadow: 3,
				}}
			>
				<Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
					{isLogin ? "Войти" : "Регистрация"}
				</Typography>

				<form onSubmit={authHandler} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
					<CustomInput
						label="Email"
						placeholder="Введите email"
						type="email"
						name="email"
						onChange={handleChange}
						value={userFormData.email}
					/>
					{!isLogin && (
						<CustomInput
							label="Имя пользователя"
							placeholder="Введите имя"
							type="text"
							name="username"
							onChange={handleChange}
							value={userFormData.username}
						/>
					)}
					<CustomInput
						label="Пароль"
						placeholder="Введите пароль"
						type="password"
						name="password"
						onChange={handleChange}
						value={userFormData.password}
					/>
					<CustomButton type="submit">{isLogin ? "Войти" : "Регистрация"}</CustomButton>
				</form>

				<Box sx={{ mt: 2 }}>
					<NavLink to={isLogin ? "/register" : "/login"}>
						{isLogin ? "Регистрация" : "Войти"}
					</NavLink>
				</Box>
			</Box>
		</Box>
	);
};

export default AuthPage;