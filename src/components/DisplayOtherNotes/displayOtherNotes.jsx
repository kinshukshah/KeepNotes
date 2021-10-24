import React from "react";
import { useNote } from "../../context/NoteContext/noteContext";
import { RenderNotes } from "../RenderNotes/renderNotes";

export const DisplayOtherNotes = () => {
  const { noteArr } = useNote();
  const otherNotes = noteArr.filter((ele) => !ele.isPinned);
  return (
    <>
      {otherNotes.length > 0 && (
        <RenderNotes displayArr={otherNotes} noteType="Other Notes" />
      )}
    </>
  );
};
