//MUI
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
//Background image
import backgroundImage from "../images/background.jpeg";

function Homepage() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      gap={15}
      sx={{
        px: { xs: 5, md: 10, xl: 15 }
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
          <Button fullWidth variant="contained">
            I have found a pet
          </Button>
          <Button fullWidth variant="outlined">
            I have lost my pet
          </Button>
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
