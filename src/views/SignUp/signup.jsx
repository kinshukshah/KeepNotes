import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { Link as BaseLink } from "react-router-dom";
import { useUserData } from "../../hooks/useUserData";
export const SignUp = () => {
  const { signUpLoading, handleSignUpSubmit } = useUserData();

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
          <Box component="form" onSubmit={handleSignUpSubmit}>
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
              disabled={signUpLoading}
            >
              {signUpLoading ? (
                <CircularProgress disableShrink color="secondary" />
              ) : (
                "Sign Up"
              )}
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
