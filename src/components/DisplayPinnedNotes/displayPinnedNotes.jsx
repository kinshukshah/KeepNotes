import React from "react";
import { useNote } from "../../context/NoteContext/noteContext";
import { RenderNotes } from "../RenderNotes/renderNotes";

export const DisplayPinnedNotes = () => {
  const { noteArr } = useNote();
  const pinnedNotes = noteArr.filter((ele) => ele.isPinned);
  return (
    <>
      {pinnedNotes.length > 0 && (
        <RenderNotes displayArr={pinnedNotes} noteType="Pinned Notes" />
      )}
    </>
  );
};
