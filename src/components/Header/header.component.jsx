import React from "react";
import {
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
export const Header = ({ toggleColorMode }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <AppBar position="sticky" sx={{ marginBottom: "2rem" }} color="inherit">
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <IconButton
            onClick={() => navigate("/")}
            color="inherit"
            disableRipple
          >
            <MenuBookIcon />
            <Typography
              variant="h6"
              color="rgb(251, 188, 4)"
              sx={{ marginLeft: "5px" }}
            >
              KeepNotes
            </Typography>
          </IconButton>
        </div>

        <IconButton color="inherit" onClick={() => navigate("/userdetails")}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit" onClick={toggleColorMode}>
          {theme.palette.mode === "dark" ? <NightsStayIcon /> : <WbSunnyIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
