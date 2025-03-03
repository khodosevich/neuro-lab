import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ThemeSwitch = ({ onToggleTheme, isDarkMode }: { onToggleTheme: () => void; isDarkMode: boolean }) => {
	return (
		<IconButton onClick={onToggleTheme} sx={{ m: 1 }}>
			{isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
		</IconButton>
	);
};

export default ThemeSwitch;