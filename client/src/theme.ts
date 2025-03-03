import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#202020',
		},
		secondary: {
			main: '#dc004e',
		},
		background: {
			default: '#F9F9FA',
			paper: '#fff',
		},
		text: {
			primary: '#202020',
		},
	},
	typography: {
		"fontFamily": `"Montserrat", serif`,
		"fontSize": 14,
		"fontWeightLight": 300,
		"fontWeightRegular": 400,
		"fontWeightMedium": 500
	}
});

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#9F9FF8',
		},
		secondary: {
			main: '#f48fb1',
		},
		background: {
			default: '#474747',
			paper: '#2A2A2A',
		},
		text: {
			primary: '#fff',
		},
	},
	typography: {
		"fontFamily": `"Montserrat", serif`,
		"fontSize": 14,
		"fontWeightLight": 300,
		"fontWeightRegular": 400,
		"fontWeightMedium": 500
	}
});
