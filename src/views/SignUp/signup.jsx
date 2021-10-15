import { useMutation } from "@apollo/client";
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
import React from "react";
import { Link as BaseLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/userContext";
import { CREATE_USER_MUTATION } from "../../GraphQL/Mutations";
export const SignUp = () => {
  const [createUser, { data, loading, error }] =
    useMutation(CREATE_USER_MUTATION);
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    createUser({
      variables: {
        name: formdata.get("name"),
        email: formdata.get("email"),
        password: formdata.get("password"),
      },
    })
      .then(({ data }) => {
        setUser(data.createUser);
        localStorage.setItem("keepnotes_user", JSON.stringify(data.createUser));
        navigate("/");
        console.log({ currentUser: data });
      })
      .catch((error) => {
        alert(`Signup Error: ${error.message}`);
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
              disabled={loading}
            >
              {loading ? (
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
