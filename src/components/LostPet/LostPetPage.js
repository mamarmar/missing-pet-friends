//React Router
import { useLocation, Link } from "react-router-dom";
//MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function LostPetPage() {
    const location = useLocation();
    const lostPet = location.state;

    return (
        <Box>
            <Stack>
                <Typography>
                    {lostPet.description}
                </Typography>
            </Stack>
        </Box>
    )
}

export default LostPetPage;