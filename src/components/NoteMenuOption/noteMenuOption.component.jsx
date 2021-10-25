import {
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import { ColorOption } from "../ColorOption/coloroption.component";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ArchiveIcon from "@mui/icons-material/Archive";
import { useNoteData } from "../../hooks/useNoteData";
export const NoteMenuOption = ({
  setNoteData,
  noteData,
  isEdit,
  handleClose: EditModelClose,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { editLoading, handleEditNote, handleAddToNote, createLoading } =
    useNoteData();
  const open = Boolean(anchorEl);
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
        {isEdit ? (
          <Button
            variant="text"
            onClick={() => handleEditNote(noteData, EditModelClose)}
            disabled={editLoading}
          >
            {editLoading ? <CircularProgress size={25} /> : "Save Note"}
          </Button>
        ) : (
          <Button
            variant="text"
            onClick={() => {
              handleAddToNote(noteData, setNoteData);
            }}
            disabled={createLoading}
          >
            {createLoading ? <CircularProgress size={25} /> : "Add Note"}
          </Button>
        )}
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
