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

export const UserDetail = () => {
  const { user } = useUser();
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
          <Button style={{ margin: "0 auto" }} variant="contained">
            Logout
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};
