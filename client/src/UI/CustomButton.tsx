import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

export const CustomButton = styled(BaseButton)(() => {
	const muiTheme = useTheme();

	return `
    font-family: ${muiTheme.typography.fontFamily};
    font-weight: ${muiTheme.typography.fontWeightMedium};
    font-size: 0.875rem;
    line-height: 1.5;
    min-width: 120px;
    width: auto;
    padding: ${muiTheme.spacing(1.5)} ${muiTheme.spacing(3)};
    border-radius: ${muiTheme.shape.borderRadius}px;
    transition: ${muiTheme.transitions.create(
		['background-color', 'box-shadow', 'transform'],
		{ duration: muiTheme.transitions.duration.short }
	)};
    cursor: pointer;
    border: none;
    text-transform: none;
    box-shadow: ${muiTheme.shadows[2]};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    /* Primary styles */
    background-color: ${muiTheme.palette.primary.main};
    color: ${muiTheme.palette.primary.contrastText};

    &:hover {
      background-color: ${muiTheme.palette.primary.dark};
      box-shadow: ${muiTheme.shadows[4]};
    }

    &.${buttonClasses.active} {
      background-color: ${muiTheme.palette.primary.dark};
      box-shadow: ${muiTheme.shadows[1]};
      transform: translateY(1px);
    }

    &.${buttonClasses.focusVisible} {
      box-shadow: 0 0 0 3px ${muiTheme.palette.primary.light};
      outline: none;
    }

    &.${buttonClasses.disabled} {
      background-color: ${muiTheme.palette.action.disabledBackground};
      color: ${muiTheme.palette.action.disabled};
      cursor: not-allowed;
      box-shadow: none;
    }

    /* Secondary variant */
    &.secondary {
      background-color: transparent;
      color: ${muiTheme.palette.primary.main};
      border: 1px solid ${muiTheme.palette.primary.main};

      &:hover {
        background-color: ${muiTheme.palette.primary.light}20;
      }
    }

    /* Error variant */
    &.error {
      background-color: ${muiTheme.palette.error.main};
      color: ${muiTheme.palette.error.contrastText};

      &:hover {
        background-color: ${muiTheme.palette.error.dark};
      }
    }

    /* Size variants */
    &.small {
      padding: ${muiTheme.spacing(1)} ${muiTheme.spacing(2)};
      font-size: 0.75rem;
    }

    &.large {
      padding: ${muiTheme.spacing(2)} ${muiTheme.spacing(4)};
      font-size: 1rem;
    }

    /* Full width */
    &.fullWidth {
      width: 100%;
    }
  `;
});