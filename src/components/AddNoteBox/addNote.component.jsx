import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { ChipElement } from "../Chip/chip.component";
import { NoteMenuOption } from "../NoteMenuOption/noteMenuOption.component";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
export const AddNoteBox = () => {
  const theme = useTheme();
  const [noteData, setNoteData] = useState({
    title: "",
    note: "",
    label: "",
    color: "white",
    isArchive: false,
    isPinned: false,
  });

  const handleNotePin = () => {
    setNoteData((data) => ({
      ...data,
      isPinned: !data.isPinned,
    }));
  };

  return (
    <Container maxWidth="sm" style={{ marginBottom: "2rem" }}>
      <Grid container>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{
              height: "fit-content",
              width: "100%",
              padding: "10px 10px",
              border:
                theme.palette.mode === "dark" ? "1px solid #5f6368" : "none",
              borderRadius: "10px",
              backgroundColor: noteData.color === "white" ? "" : noteData.color,
            }}
          >
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
            <NoteMenuOption setNoteData={setNoteData} noteData={noteData} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
