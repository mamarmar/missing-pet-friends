//MUI
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

function Footer() {
  return (
    <Box
      sx={{
        mb: 0,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
        }}
      >
        Created by&nbsp;
        <Link variant="inherit" href="https://github.com/mamarmar">
          Margarita Marmaridou
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;
