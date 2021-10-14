import react, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AddNoteBox } from "../AddNoteBox/addNote.component";
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
  const [noteData, setNoteData] = useState({
    title: "",
    note: "",
    label: "",
    color: "white",
    isArchive: false,
    isPinned: false,
  });
  console.log({ editData, noteData });
  const handleNotePin = () => {
    setNoteData((data) => ({
      ...data,
      isPinned: !data.isPinned,
    }));
  };
  useEffect(() => {
    if (editData) setNoteData(editData);
  }, [editData]);
  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <div
          style={{
            backgroundColor: noteData.color === "white" ? "" : noteData.color,
          }}
        >
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
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
            <NoteMenuOption setNoteData={setNoteData} noteData={noteData} />
            {/* <Button onClick={handleClose}>Close</Button> */}
            <Button onClick={handleClose}>Save</Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
