import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';

const black = {
	50: '#e8e8e8',   // Светло-серый
	100: '#d0d0d0',  // Серый
	200: '#a8a8a8',  // Темно-серый
	300: '#808080',  // Средний серый
	400: '#585858',  // Темный серый
	500: '#404040',  // Очень темный серый
	600: '#303030',  // Почти черный
	700: '#1c1c1c',  // Очень темный
	800: '#0d0d0d',  // Угольный
	900: '#000',  // Черный
};

const grey = {
	50: '#f3f6f9',
	100: '#e5eaf2',
	200: '#dae2ed',
	300: '#c7d0dd',
	400: '#b0b8c4',
	500: '#9da8b7',
	600: '#6b7a90',
	700: '#434d5b',
	800: '#303740',
	900: '#1c2025',
};

export const CustomButton = styled(BaseButton)(
	({ theme }) => `
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${black[500]}; // Используем черный цвет
  padding-block: 14px;
  border-radius: 16px;
  color: white;
  transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease; 
  cursor: pointer;
  border: 1px solid ${black[500]};
  box-shadow: 0 2px 1px ${
		theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
	}, inset 0 1.5px 1px ${black[400]}, inset 0 -2px 1px ${black[600]};

  &:hover {
    background-color: ${black[600]}; // Цвет при наведении
  }

  &.${buttonClasses.active} {
    background-color: ${black[700]};
    box-shadow: none;
    transform: scale(0.99);
  }

  &.${buttonClasses.focusVisible} {
    box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? black[300] : black[200]};
    outline: none;
  }

  &.${buttonClasses.disabled} {
    background-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[700]};
    border: 0;
    cursor: default;
    box-shadow: none;
    transform: scale(1);
  }
  `,
);