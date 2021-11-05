import "./App.css";
import React, { useState } from "react";
import {
  createTheme,
  CssBaseline,
  Paper,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SignIn } from "./views/SignIn/signin";
import { PrivateRoute } from "./PrivateRoute";
import { SignUp } from "./views/SignUp/signup";
import { Note } from "./views/Note/note";
import { Header } from "./components/Header/header.component";
import { UserDetail } from "./components/UserDetails/userDetail.component";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <Paper sx={{ minHeight: "100vh" }}>
        <Header toggleColorMode={colorMode.toggleColorMode} />
        <Routes>
          {/* <PrivateRoute path="/" element={<Note />} /> */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Note />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/userdetails"
            element={
              <PrivateRoute>
                <UserDetail />
              </PrivateRoute>
            }
          />
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
