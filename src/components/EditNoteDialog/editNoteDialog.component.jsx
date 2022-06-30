import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { INITIAL_NOTE_DATA } from "../AddNoteBox/addNote.component";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import { NoteMenuOption } from "../NoteMenuOption/noteMenuOption.component";
import { ChipElement } from "../Chip/chip.component";
export default function FormDialog({
  handleClickOpen,
  handleClose,
  open,
  editData,
}) {
  const [noteData, setNoteData] = useState(INITIAL_NOTE_DATA);

  useEffect(() => {
    if (editData) setNoteData(editData);
  }, [editData]);

  const handleNotePin = () => {
    setNoteData((data) => ({
      ...data,
      isPinned: !data.isPinned,
    }));
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <div
          style={{
            backgroundColor: noteData.color === "white" ? "" : noteData.color,
          }}
        >
          <DialogContent>
            <TextField
              placeholder="Title"
              sx={{
                width: "100%",
                border: "none",
                outline: "none",
                color: "black",
              }}
              variant="standard"
              value={noteData.title}
              onChange={(e) =>
                setNoteData((data) => ({ ...data, title: e.target.value }))
              }
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleNotePin}>
                      {noteData.isPinned ? (
                        <PushPinIcon />
                      ) : (
                        <PushPinOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Take a note..."
              minRows={3}
              sx={{
                width: "100%",
                border: "none",
                outline: "none",
              }}
              multiline
              onChange={(e) =>
                setNoteData((data) => ({ ...data, note: e.target.value }))
              }
              value={noteData.note}
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
            <ChipElement setNoteData={setNoteData} noteData={noteData} />
          </DialogContent>
          <DialogActions>
            <NoteMenuOption
              setNoteData={setNoteData}
              noteData={noteData}
              isEdit={true}
              handleClose={handleClose}
            />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
