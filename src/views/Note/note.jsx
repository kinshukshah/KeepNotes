import React from "react";
import { AddNoteBox } from "../../components/AddNoteBox/addNote.component";
import { DisplayAllNotes } from "../../components/DisplayAllNotes/displayAllNotes.component";
import { useUser } from "../../context/UserContext/userContext";

export const Note = () => {
  const { user } = useUser();
  console.log({ user });
  return (
    <>
      <AddNoteBox />
      <DisplayAllNotes />
    </>
  );
};
