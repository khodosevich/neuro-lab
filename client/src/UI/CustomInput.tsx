import * as React from 'react';
import { useInput } from '@mui/base/useInput';
import { styled } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { InputLabel, Box } from '@mui/material';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

const StyledInputElement = styled('input')(
	({ theme }) => `
  width: 320px; 
  font-size: 18px;
  padding: 14px 20px;
  border-radius: 16px;
  color: ${theme.palette.text.primary};
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.grey[300]};
  box-shadow: 0 2px 4px ${
		theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
	};

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 1px ${theme.palette.primary.light};
  }

  &:focus-visible {
    outline: 0;
  }
`,
);

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(function CustomInput(
	{ label, ...props },
	ref
) {
	const { getRootProps, getInputProps } = useInput(props);
	const inputProps = getInputProps();
	inputProps.ref = useForkRef(inputProps.ref, ref);

	return (
		<Box>
			<InputLabel required>{label}</InputLabel>
			<Box sx={{ marginTop: '4px' }} {...getRootProps()}>
				<StyledInputElement {...props} {...inputProps} />
			</Box>
		</Box>
	);
});

export default CustomInput;