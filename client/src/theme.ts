import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#3f51b5',
			light: '#757de8',
			dark: '#002984',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#f50057',
			light: '#ff5983',
			dark: '#bb002f',
			contrastText: '#ffffff',
		},
		background: {
			default: '#f5f5f5',
			paper: '#ffffff',
		},
		text: {
			primary: '#212121',
			secondary: '#757575',
			disabled: '#bdbdbd',
		},
		divider: 'rgba(0, 0, 0, 0.12)',
		action: {
			active: '#3f51b5',
			hover: 'rgba(63, 81, 181, 0.08)',
			selected: 'rgba(63, 81, 181, 0.16)',
			disabled: 'rgba(0, 0, 0, 0.26)',
			disabledBackground: 'rgba(0, 0, 0, 0.12)',
		},
		error: {
			main: '#f44336',
			light: '#e57373',
			dark: '#d32f2f',
		},
		warning: {
			main: '#ff9800',
			light: '#ffb74d',
			dark: '#f57c00',
		},
		info: {
			main: '#2196f3',
			light: '#64b5f6',
			dark: '#1976d2',
		},
		success: {
			main: '#4caf50',
			light: '#81c784',
			dark: '#388e3c',
		},
	},
	typography: {
		fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 700,
			lineHeight: 1.3,
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
			lineHeight: 1.4,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 500,
			lineHeight: 1.6,
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.7,
		},
		subtitle1: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.75,
		},
		subtitle2: {
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.57,
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.5,
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.43,
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.75,
			textTransform: 'none',
		},
		caption: {
			fontSize: '0.75rem',
			fontWeight: 400,
			lineHeight: 1.66,
		},
		overline: {
			fontSize: '0.75rem',
			fontWeight: 400,
			lineHeight: 2.66,
			textTransform: 'uppercase',
		},
	},
	shape: {
		borderRadius: 8,
	},
	spacing: 8,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					padding: '8px 16px',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
				},
			},
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9',
			light: '#e3f2fd',
			dark: '#42a5f5',
		},
		secondary: {
			main: '#00bcd4',
			light: '#62efff',
			dark: '#008ba3',
			contrastText: '#000000',
		},
		background: {
			default: '#121212',
			paper: '#1e1e1e',
		},
		text: {
			primary: '#ffffff',
			secondary: 'rgba(255, 255, 255, 0.7)',
			disabled: 'rgba(255, 255, 255, 0.5)',
		},
		divider: 'rgba(255, 255, 255, 0.12)',
		action: {
			active: '#ffffff',
			hover: 'rgba(255, 255, 255, 0.08)',
			selected: 'rgba(255, 255, 255, 0.16)',
			disabled: 'rgba(255, 255, 255, 0.3)',
			disabledBackground: 'rgba(255, 255, 255, 0.12)',
		},
		error: {
			main: '#f44336',
			light: '#e57373',
			dark: '#d32f2f',
		},
		warning: {
			main: '#ff9800',
			light: '#ffb74d',
			dark: '#f57c00',
		},
		info: {
			main: '#2196f3',
			light: '#64b5f6',
			dark: '#1976d2',
		},
		success: {
			main: '#4caf50',
			light: '#81c784',
			dark: '#388e3c',
		},
	},
	typography: {
		fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
		fontSize: 14,
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		h1: {
			fontSize: '2.5rem',
			fontWeight: 700,
			lineHeight: 1.2,
		},
		h2: {
			fontSize: '2rem',
			fontWeight: 700,
			lineHeight: 1.3,
		},
		h3: {
			fontSize: '1.75rem',
			fontWeight: 600,
			lineHeight: 1.4,
		},
		h4: {
			fontSize: '1.5rem',
			fontWeight: 600,
			lineHeight: 1.5,
		},
		h5: {
			fontSize: '1.25rem',
			fontWeight: 500,
			lineHeight: 1.6,
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 500,
			lineHeight: 1.7,
		},
		subtitle1: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.75,
		},
		subtitle2: {
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.57,
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.5,
		},
		body2: {
			fontSize: '0.875rem',
			fontWeight: 400,
			lineHeight: 1.43,
		},
		button: {
			fontSize: '0.875rem',
			fontWeight: 500,
			lineHeight: 1.75,
			textTransform: 'none',
		},
		caption: {
			fontSize: '0.75rem',
			fontWeight: 400,
			lineHeight: 1.66,
		},
		overline: {
			fontSize: '0.75rem',
			fontWeight: 400,
			lineHeight: 2.66,
			textTransform: 'uppercase',
		},
	},
	shape: {
		borderRadius: 8,
	},
	spacing: 8,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					padding: '8px 16px',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
				},
			},
		},
	},
});