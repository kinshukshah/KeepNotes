import {
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import PushPinIcon from "@mui/icons-material/PushPin";
import { useNote } from "../../context/NoteContext/noteContext";
import FormDialog from "../EditNoteDialog/editNoteDialog.component";
import { useMutation } from "@apollo/client";
import { DELETE_NOTE_MUTATION } from "../../GraphQL/Mutations";
export const DisplayAllNotes = () => {
  const theme = useTheme();
  const { noteArr, setNoteArr } = useNote();
  const [open, setOpen] = React.useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteNote, { loading }] = useMutation(DELETE_NOTE_MUTATION);

  const handleClickOpen = (data) => {
    setEditData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setEditData(null);
    setOpen(false);
  };

  const handleNoteDelete = (noteId) => {
    deleteNote({
      variables: { noteId },
    })
      .then(({ data }) => {
        let newArr = noteArr.filter((ele) => ele._id !== data.deleteNote._id);
        setNoteArr([...newArr]);
      })
      .catch((error) => {
        alert(`Could not delete ${error.message}`);
      });
  };
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {noteArr.map((data) => (
          <Grid item xs={12} sm={6} md={3} key={data._id}>
            <Paper
              elevation={3}
              style={{
                height: "300px",
                width: "100%",
                padding: "10px 10px 20px 10px",
                border:
                  theme.palette.mode === "dark" ? "1px solid #5f6368" : "none",
                borderRadius: "10px",
                backgroundColor: data.color === "white" ? "" : data.color,
              }}
            >
              <div style={{ display: "flex" }}>
                <Typography
                  variant="h2"
                  sx={{
                    height: "8%",
                    fontSize: "1rem",
                    fontWeight: "500",
                    lineHeight: "1.5rem",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    margin: "10px 0",
                    whiteSpace: "nowrap",
                    width: "95%",
                  }}
                >
                  {data.title}
                </Typography>
                <IconButton style={{ alignSelf: "flex-end" }}>
                  {data.isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
                </IconButton>
              </div>

              <Typography
                className="note-text"
                sx={{
                  // minHeight: "80px",
                  // maxHeight: "150px",
                  height: "75%",
                  overflowY: "auto",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  scrollbarWidth: "thin",
                }}
              >
                {data.note ? data.note : "Empty Note"}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "2px",
                }}
              >
                <IconButton onClick={() => handleClickOpen(data)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleNoteDelete(data._id)}
                  disabled={loading}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Paper>
          </Grid>
        ))}
        <FormDialog
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
          editData={editData}
        />
      </Grid>
    </Container>
  );
};
