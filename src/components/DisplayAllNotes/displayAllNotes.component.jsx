import React from "react";
import { DisplayPinnedNotes } from "../DisplayPinnedNotes/displayPinnedNotes";
import { DisplayOtherNotes } from "../DisplayOtherNotes/displayOtherNotes";

export const DisplayAllNotes = () => {
  return (
    <>
      <DisplayPinnedNotes />
      <DisplayOtherNotes />
    </>
  );
};
