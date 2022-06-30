import { CircularProgress, Container } from "@mui/material";
import React from "react";

export const Loader = () => {
  return (
    <Container maxWidth="xs" sx={{ height: "100%" }}>
      <CircularProgress color="secondary" />
    </Container>
  );
};
