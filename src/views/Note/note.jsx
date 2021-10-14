import React from "react";
import { AddNoteBox } from "../../components/AddNoteBox/addNote.component";
import { DisplayAllNotes } from "../../components/DisplayAllNotes/displayAllNotes.component";

export const Note = () => {
  return (
    <>
      <AddNoteBox />
      <DisplayAllNotes />
    </>
  );
};
