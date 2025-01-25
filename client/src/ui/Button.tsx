
import { Box } from "@mui/material"

const Button = ({label}: {label: string}) => {
    return(
        <Box>
            <button className="button">{label}</button>
        </Box>
    )
}

export default Button;