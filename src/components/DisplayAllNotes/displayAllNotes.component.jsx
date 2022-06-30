import React from "react";
import { DisplayPinnedNotes } from "../DisplayPinnedNotes/displayPinnedNotes";
import { DisplayOtherNotes } from "../DisplayOtherNotes/displayOtherNotes";
import { useNote } from "../../context/NoteContext/noteContext";
import { CircularProgress } from "@mui/material";

export const DisplayAllNotes = () => {
  const { noteLoading } = useNote();
  return (
    <>
      {noteLoading ? (
        <div style={{ width: "0%", margin: "0 auto" }}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <DisplayPinnedNotes />
          <DisplayOtherNotes />
        </>
      )}
    </>
  );
};
