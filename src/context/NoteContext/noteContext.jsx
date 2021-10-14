import React, { createContext, useContext, useState, useEffect } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteArr, setNoteArr] = useState([]);
  useEffect(() => {
    console.log(noteArr);
  }, [noteArr]);
  return (
    <NoteContext.Provider value={{ noteArr, setNoteArr }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
