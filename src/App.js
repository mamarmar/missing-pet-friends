import "./App.css";
import React from "react";
//React Router
import { Route, Routes } from "react-router-dom";
//Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import LostPetGrid from "./components/LostPet/LostPetGrid";
import LostPetPage from "./components/LostPet/LostPetPage";
import LostPetForm from "./components/LostPet/LostPetForm";
//MUI
import { createTheme, colors, ThemeProvider } from "@mui/material";

function App() {
  const [lostPets, setLostPets] = React.useState([]);
  const [popUp, setPopUp] = React.useState({
    isOpen: false,
    petName: "",
    toEmail: "",
    fromEmail: "",
  });

  const theme = createTheme({
    palette: {
      common: {
        black: "#160f29",
        white: "#FFFFFF",
      },
      primary: {
        main: "#5158BB",
      },
      error: {
        main: colors.red[500],
      },
      success: {
        main: colors.green[500],
      },
    },
    typography: {
      fontFamily: "Roboto, Roboto Condensed",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar setLostPets={setLostPets} />
        <Routes>
          <Route path="/" element={<Homepage setLostPets={setLostPets} />} />
          <Route
            path="/lostpets"
            element={
              <LostPetGrid
                lostPets={lostPets}
                setLostPets={setLostPets}
                popUp={popUp}
                setPopUp={setPopUp}
              />
            }
          />
          <Route
            path="/lostpets/:id"
            element={<LostPetPage popUp={popUp} setPopUp={setPopUp} />}
          />
          <Route path="/form" element={<LostPetForm />} />
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
