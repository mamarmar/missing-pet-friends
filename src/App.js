import "./App.css";
//React Router
import { Route, Routes } from "react-router-dom";
//Components
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
//MUI
import { createTheme, colors, ThemeProvider } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      common: {
        black: "#131b23",
        white: "#FAF8F7",
      },
      primary: {
        main: colors.deepOrange[500],
        light: colors.deepOrange[300],
        dark: colors.deepOrange[700],
      },
      error: {
        main: colors.red[500],
      },
      success: {
        main: colors.green[500],
      },
    },
    typography: {
      fontFamily: "Poppins",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
