import React from "react";
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
//Components
import MessagePopUp from "../MessagePopUp";

function LostPetPage({ popUp, setPopUp }) {
  const location = useLocation();
  const lostPet = location.state;

  function changeDateFormat(string) {
    const shortened = string.split("T")[0];
    const date = new Date(shortened).toString();
    return date.substring(4, 15);
  }

  function openMessagePopUp() {
    setPopUp((prevValue) => {
      return {
        ...prevValue,
        isOpen: true,
        petName: lostPet.petName,
        toEmail: lostPet.email,
      };
    });
  }

  return (
    <Stack direction="row" justifyContent="center">
      {popUp.isOpen && <MessagePopUp popUp={popUp} setPopUp={setPopUp} />}
      <Stack
        spacing={2}
        sx={{
          mb: 5,
          width: 300,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 50,
            textAlign: "center",
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
        <Typography
          variant="p"
          sx={{
            color: "grey.500",
            fontSize: 14,
            textAlign: "right",
          }}
        >
          Missing since {changeDateFormat(lostPet.date)}
        </Typography>
        <Button fullWidth variant="contained" onClick={openMessagePopUp}>
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
