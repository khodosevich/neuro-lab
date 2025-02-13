import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';

const black = {
	50: '#e8e8e8',
	100: '#d0d0d0',
	200: '#a8a8a8',
	300: '#808080',
	400: '#585858',
	500: '#404040',
	600: '#303030',
	700: '#1c1c1c',
	800: '#0d0d0d',
	900: '#000',
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
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  background-color: ${theme.palette.primary.main};
  padding-block: 14px;
  border-radius: 16px;
  color: white;
  transition: background-color 150ms ease, color 150ms ease, box-shadow 150ms ease; 
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 1px ${
		theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
	};

  &:hover {
    background-color: ${ theme.palette.mode === 'dark' ? grey[600] : grey[800]};
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