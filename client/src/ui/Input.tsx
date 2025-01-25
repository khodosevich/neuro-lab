import { Box } from "@mui/material"

const Input = ({ placeholder, type, label, required }: { placeholder: string, type?: string, label: string, required?: boolean }) => {
    return(
        <Box className="input-wrapper">
            <label>{label}{required && "*"}</label>
            <input className="input" placeholder={placeholder} type={type} />
        </Box>
    )
}

export default Input;