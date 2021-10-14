import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import React from "react";
import { Link as BaseLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
export const SignUp = () => {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              label="Name"
              name="name"
              fullWidth
              required
              id="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              label="Email Address"
              name="email"
              fullWidth
              required
              id="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              label="Password"
              name="password"
              fullWidth
              required
              id="password"
              autoComplete="current-password"
              autoFocus
              type="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //   disabled={loading}
            >
              Sign Up
              {/* {loading ? (
                <CircularProgress disableShrink color="secondary" />
              ) : (
                "SignUp"
              )} */}
            </Button>
            <Grid container>
              <Grid item>
                <BaseLink to="/signin">
                  {"Already have a account ? Login"}
                </BaseLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
