import { useMutation } from "@apollo/client";
import React from "react";
import { useNote } from "../context/NoteContext/noteContext";
import { useUser } from "../context/UserContext/userContext";
import {
  CREATE_NOTE_MUTATION,
  DELETE_NOTE_MUTATION,
  EDIT_NOTE_MUTATION,
} from "../GraphQL/Mutations";

export const useNoteData = () => {
  const [editNote, { loading: editLoading }] = useMutation(EDIT_NOTE_MUTATION);
  const [createNote, { loading: createLoading }] =
    useMutation(CREATE_NOTE_MUTATION);
  const [deleteNote, { loading: deleteLoading }] =
    useMutation(DELETE_NOTE_MUTATION);
  const { user } = useUser();
  const { noteArr, setNoteArr } = useNote();

  const handleAddToNote = (noteData) => {
    createNote({
      variables: {
        userId: user._id,
        ...noteData,
      },
    })
      .then(({ data }) => {
        setNoteArr((arr) => [...arr, data.createNote]);
        console.log({ addtoNo: data });
      })
      .catch((error) => {
        alert(`Add to note Error: ${error.message}`);
        console.log({ error });
      });
  };

  const handleEditNote = (noteData) => {
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
        // handleClose();
      })
      .catch((error) => {
        alert(`Edit note Error: ${error.message}`);
        console.log({ error });
      });
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

  return {
    handleEditNote,
    editLoading,
    handleAddToNote,
    createLoading,
    handleNoteDelete,
    deleteLoading,
  };
};
