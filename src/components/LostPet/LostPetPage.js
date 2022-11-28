//React Router
import { useLocation } from "react-router-dom";
//MUI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
//Image
import dog from "../../images/dog.jpeg";

function LostPetPage() {
  const location = useLocation();
  const lostPet = location.state;

  return (
    <Stack direction="row" justifyContent="center">
      <Stack
        spacing={2}
        sx={{
          marginTop: 5,
          width: 300,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 50,
          }}
        >
          {lostPet.petName}
        </Typography>
        <Box
          sx={{
            backgroundImage: `url(${dog})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: 240,
            borderRadius: 1,
          }}
        ></Box>
        <Button fullWidth variant="contained">
          Contact Owner
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="start">
          <PlaceIcon />
          <Typography>{lostPet.city}</Typography>
        </Stack>

        <Typography
          sx={{
            textAlign: "left",
          }}
        >
          {lostPet.description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default LostPetPage;
