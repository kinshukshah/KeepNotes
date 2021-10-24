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
import { useMutation } from "@apollo/client";
import { EDIT_NOTE_MUTATION } from "../../GraphQL/Mutations";
import { useUser } from "../../context/UserContext/userContext";
import { useNote } from "../../context/NoteContext/noteContext";
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
  const [editNote, { loading }] = useMutation(EDIT_NOTE_MUTATION);
  const { user } = useUser();
  const { noteArr, setNoteArr } = useNote();

  useEffect(() => {
    if (editData) setNoteData(editData);
  }, [editData]);

  const handleNotePin = () => {
    setNoteData((data) => ({
      ...data,
      isPinned: !data.isPinned,
    }));
  };

  const handleEditNote = () => {
    console.log({ editNoteData: noteData });
    editNote({
      variables: {
        userId: user._id,
        title: noteData.title,
        note: noteData.note,
        color: noteData.color,
        isArchive: noteData.isArchive,
        isPinned: noteData.isPinned,
        label: noteData.label,
        noteId: noteData._id,
      },
    })
      .then(({ data }) => {
        let newArrEdit = [...noteArr].map((ele) => {
          if (ele._id === data.editNote._id) {
            return data.editNote;
          } else {
            return ele;
          }
        });
        setNoteArr([...newArrEdit]);
        handleClose();
      })
      .catch((error) => {
        alert(`Edit note Error: ${error.message}`);
        console.log({ error });
      });
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
              handleEditNote={handleEditNote}
              editLoading={loading}
            />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
