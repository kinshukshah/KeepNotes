import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useUser } from "../../context/UserContext/userContext";
import { useNavigate } from "react-router-dom";
import { useNote } from "../../context/NoteContext/noteContext";
export const UserDetail = () => {
  const { user, setUser } = useUser();
  const { setNoteArr } = useNote();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("keepnotes_user");
    setUser(null);
    setNoteArr([]);
    navigate("/signin");
  };
  return (
    <Container maxWidth="xs">
      <Card variant="elevation">
        <CardContent>
          <Avatar style={{ margin: "12px auto" }}>{user.name[0]}</Avatar>
          <Grid container>
            <Grid item sm={2}>
              <Typography gutterBottom sx={{ marginRight: "5px" }}>
                Name:
              </Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography gutterBottom>{user.name}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item sm={2}>
              <Typography gutterBottom sx={{ marginRight: "5px" }}>
                Email:
              </Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography gutterBottom>{user.email}</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            style={{ margin: "0 auto" }}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
