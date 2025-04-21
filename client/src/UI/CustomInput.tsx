import * as React from 'react';
import { useInput } from '@mui/base/useInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { InputLabel, Box, useTheme } from '@mui/material';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	fullWidth?: boolean;
	error?: boolean;
	helperText?: string;
}

const StyledInputElement = styled('input')(
	({ theme }) => `
  width: 100%;
  font-family: ${theme.typography.fontFamily};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px 16px;
  border-radius: ${theme.shape.borderRadius}px;
  color: ${theme.palette.text.primary};
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[300]};
  box-shadow: ${theme.shadows[1]};
  transition: ${theme.transitions.create(['border-color', 'box-shadow'])};

  &:hover {
    border-color: ${theme.palette.text.secondary};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 2px ${theme.palette.primary.light};
  }

  &:focus-visible {
    outline: 0;
  }

  &.error {
    border-color: ${theme.palette.error.main};
  }

  &:disabled {
    background-color: ${theme.palette.action.disabledBackground};
    color: ${theme.palette.action.disabled};
    cursor: not-allowed;
  }
`,
);

const HelperText = styled('p')(
	({ theme }) => `
  margin: 4px 0 0 0;
  font-size: 0.75rem;
  color: ${theme.palette.text.secondary};
  
  &.error {
    color: ${theme.palette.error.main};
  }
`
);

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
	function CustomInput({ label, fullWidth, error, helperText, ...props }, ref) {
		const theme = useTheme();
		const { getRootProps, getInputProps } = useInput(props);
		const inputProps = getInputProps();
		inputProps.ref = useForkRef(inputProps.ref, ref);

		return (
			<Box sx={{ width: fullWidth ? '100%' : '320px' }}>
				<InputLabel
					sx={{
						mb: 0.5,
						color: error ? theme.palette.error.main : theme.palette.text.primary,
					}}
					required={props.required}
				>
					{label}
				</InputLabel>
				<Box {...getRootProps()}>
					<StyledInputElement
						{...props}
						{...inputProps}
						className={error ? 'error' : ''}
					/>
				</Box>
				{helperText && (
					<HelperText className={error ? 'error' : ''}>
						{helperText}
					</HelperText>
				)}
			</Box>
		);
	}
);

export default CustomInput;