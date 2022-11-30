import * as React from "react";
import axios from "axios";
//MUI
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//React Router
import { Link } from "react-router-dom";
//Background image
import backgroundImage from "../images/background.jpeg";

function Homepage({ setLostPets }) {
  React.useEffect(() => {
    getLostPets();
  }, []);

  async function getLostPets() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/lostpets/`
      );
      setLostPets(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      gap={15}
      sx={{
        px: { xs: 5, md: 10, xl: 15 },
      }}
    >
      <Stack
        sx={{
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: 36,
            fontWeight: "light",
            textAlign: "left",
            mb: 3,
          }}
        >
          We help missing pets reunite with their owners.
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          gap={3}
        >
          <Link to="/lostpets" style={{ textDecoration: "none", width: "100%" }}>
            <Button fullWidth variant="contained">
              I have found a pet
            </Button>
          </Link>
          <Link to="/form" style={{ textDecoration: "none", width: "100%" }}>
            <Button fullWidth variant="outlined">
              I have lost my pet
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: { md: "60%", xl: "30%" },
          height: 400,
          display: { xs: "none", md: "flex" },
        }}
      ></Box>
    </Stack>
  );
}

export default Homepage;
