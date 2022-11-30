import * as React from "react";
import axios from "axios";
//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
//React Router
import { Link } from "react-router-dom";

function Navbar({ setLostPets }) {
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

  //MUI
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const pages = [
    {
      id: 1,
      title: "Lost Pets",
      link: "/lostpets",
      click: getLostPets,
    },
    {
      id: 2,
      title: "Lost Pet Form",
      link: "/form",
      click: "",
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ boxShadow:"none", bgcolor:"common.white"}}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters >
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Stack direction="row" alignItems="center">
                <PetsIcon
                  sx={{
                    display: { xs: "flex", md: "none" },
                    mr: 0.5,
                    fontSize: 58,
                    color:"common.black"
                  }}
                />
                <Typography
                  wrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    fontWeight: 700,
                    lineHeight: "1",
                    color:"common.black",
                    textDecoration: "none",
                    width: 30,
                    textAlign: "left",
                    fontFamily:"Roboto Condensed"
                  }}
                >
                  Missing Pet Friends
                </Typography>
              </Stack>
            </Link>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="common.black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page.link}
                  onClick={page.click}
                  style={{ textDecoration: "none", color:"#160f29" }}
                >
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent:"space-between", alignItems:"center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Stack direction="row" alignItems="center">
              <PetsIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 0.5,
                  fontSize: 58,
                  color:"common.black"
                }}
              />
              <Typography
                wrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  lineHeight: "1",
                  color:"common.black",
                  textDecoration: "none",
                  width: 30,
                  textAlign: "left",
                  fontFamily:"Roboto Condensed"
                }}
              >
                Missing Pet Friends
              </Typography>
            </Stack>
          </Link>
          <Stack
            direction="row"
            spacing={2}
          >
            {pages.map((page) => (
              <Link
                to={page.link}
                onClick={page.click}
                style={{ textDecoration: "none" }}
              >
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color:"common.black", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
