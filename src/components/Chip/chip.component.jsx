import { Chip, Stack } from "@mui/material";
import React from "react";

export const ChipElement = ({ noteData, setNoteData, displayData }) => {
  const handleDelete = () => {
    setNoteData((data) => ({ ...data, label: "Note" }));
  };
  return (
    <div>
      <Stack
        direction={{ sm: "row" }}
        spacing={{ xs: 1 }}
        sx={{ flexWrap: "wrap" }}
      >
        {noteData.label && displayData ? (
          <Chip label={noteData.label} />
        ) : (
          <Chip label={noteData.label} onDelete={handleDelete} />
        )}
      </Stack>
    </div>
  );
};
