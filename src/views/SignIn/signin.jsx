import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Link as BaseLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_USER_MUTATION } from "../../GraphQL/Mutations";
import { useMutation } from "@apollo/client";
import { useUser } from "../../context/UserContext/userContext";
export const SignIn = () => {
  const [loginUser, { error, data, loading }] =
    useMutation(LOGIN_USER_MUTATION);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    // const { from } = locationState;
    const formdata = new FormData(event.currentTarget);
    loginUser({
      variables: {
        email: formdata.get("email"),
        password: formdata.get("password"),
      },
    })
      .then(({ data }) => {
        setUser(data.loginUser);
        localStorage.setItem("keepnotes_user", JSON.stringify(data.loginUser));
        navigate("/");
        console.log({ currentUser: data });
      })
      .catch((error) => {
        alert(`Signin Error: ${error.message}`);
        console.log({ error });
      });
  };
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
            Sign In
          </Typography>
          <Box component="form" onSubmit={(e) => handleSignInSubmit(e)}>
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
              disabled={loading}
            >
              {/* Sign In */}
              {loading ? (
                <CircularProgress color="secondary" disableShrink />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item>
                <BaseLink to="/signup">
                  {"Don't have a account ? Sign Up"}
                </BaseLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
