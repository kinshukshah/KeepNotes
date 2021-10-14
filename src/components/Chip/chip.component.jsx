import { Chip, Stack } from "@mui/material";
import React from "react";

export const ChipElement = ({ noteData, setNoteData }) => {
  const handleDelete = () => console.log("Item Deleted");
  return (
    <div>
      <Stack
        direction={{ sm: "row" }}
        spacing={{ xs: 1 }}
        sx={{ flexWrap: "wrap" }}
      >
        {noteData.label && (
          <Chip label={noteData.label} onDelete={handleDelete} />
        )}
      </Stack>
    </div>
  );
};
