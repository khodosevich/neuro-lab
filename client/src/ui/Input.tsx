import { Box } from "@mui/material"
import React, { ChangeEvent } from 'react';

interface InputProps {
    placeholder: string;
    type: string;
    label: string;
    required?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
}

const Input: React.FC<InputProps> = ({ placeholder, type, label, required, onChange, value }) => {
    return(
        <Box className="input-wrapper">
            <label>{label}{required && "*"}</label>
            <input className="input" placeholder={placeholder}
                   type={type} onChange={onChange} value={value} />
        </Box>
    )
}

export default Input;