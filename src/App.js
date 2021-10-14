import "./App.css";
import React, { useState } from "react";
import {
  Button,
  createTheme,
  CssBaseline,
  Paper,
  Switch,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { AddNoteBox } from "./components/AddNoteBox/addNote.component";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignIn } from "./views/SignIn/signin";
import { PrivateRoute } from "./PrivateRoute";
import { SignUp } from "./views/SignUp/signup";
import { Note } from "./views/Note/note";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <Paper sx={{ minHeight: "100vh" }}>
        <Switch onChange={colorMode.toggleColorMode} />
        {/* <Typography variant="h1">
          {theme.palette.mode === "dark" ? "Dark Mode" : "Light Mode"}
        </Typography> */}
        {/* <AddNoteBox /> */}
        <Button onClick={() => navigate("/signin")}>CLICKME</Button>
        <Routes>
          <PrivateRoute path="/" element={<Note />} />
          <PrivateRoute path="/signin" element={<SignIn />} />
          <PrivateRoute path="/signup" element={<SignUp />} />
        </Routes>
      </Paper>
    </>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("dark");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem(
          "keepNoteMode",
          mode === "light" ? "dark" : "light"
        );
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// export default App;
