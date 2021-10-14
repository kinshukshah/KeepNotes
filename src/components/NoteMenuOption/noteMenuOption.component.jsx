import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { ColorOption } from "../ColorOption/coloroption.component";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useNote } from "../../context/NoteContext/noteContext";
export const NoteMenuOption = ({ setNoteData, noteData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { noteArr, setNoteArr } = useNote();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNoteArchive = () => {
    setNoteData((data) => ({ ...data, isArchive: !data.isArchive }));
  };

  const handleNoteLabel = (e) => {
    handleClose();
    setNoteData((data) => ({ ...data, label: e.target.getAttribute("value") }));
  };

  const handleAddToNote = () => {
    setNoteArr((arr) => [...arr, noteData]);
    console.log(noteData);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ColorOption setNoteData={setNoteData} noteData={noteData} />

        <IconButton
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <LabelImportantOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleNoteArchive}>
          {noteData.isArchive ? <ArchiveIcon /> : <ArchiveOutlinedIcon />}
        </IconButton>
      </div>
      <div>
        <Button variant="text" onClick={handleAddToNote}>
          Add note
        </Button>
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleNoteLabel} value="To-Do">
          To-Do
        </MenuItem>
        <MenuItem onClick={handleNoteLabel} value="Personal">
          Personal
        </MenuItem>
        <MenuItem onClick={handleNoteLabel} value="Work">
          Work
        </MenuItem>
        <MenuItem onClick={handleNoteLabel} value="Note">
          Note
        </MenuItem>
      </Menu>
    </div>
  );
};
