import { useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNote } from "../context/NoteContext/noteContext";
import { useUser } from "../context/UserContext/userContext";
import {
  CREATE_USER_MUTATION,
  LOGIN_USER_MUTATION,
} from "../GraphQL/Mutations";

export const useUserData = () => {
  const [
    loginUser,
    { error: loginError, data: loginData, loading: loginLoading },
  ] = useMutation(LOGIN_USER_MUTATION);
  const [
    createUser,
    { data: signUpData, loading: signUpLoading, error: signUpError },
  ] = useMutation(CREATE_USER_MUTATION);
  const { user, setUser } = useUser();
  const { setNoteArr } = useNote();

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
      })
      .catch((error) => {
        alert(`Signin Error: ${error.message}`);
        console.log({ error });
      });
  };

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

  const handleLogout = () => {
    localStorage.removeItem("keepnotes_user");
    setUser(null);
    setNoteArr([]);
    navigate("/signin");
  };

  return {
    loginLoading,
    handleSignInSubmit,
    signUpLoading,
    handleSignUpSubmit,
    handleLogout,
  };
};
