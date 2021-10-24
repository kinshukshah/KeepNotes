import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { GETALLNOTESBYUSER } from "../../GraphQL/Queries";
import { useUser } from "../UserContext/userContext";
export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [noteArr, setNoteArr] = useState([]);
  const { user } = useUser();
  const { error, loading, data } = useQuery(GETALLNOTESBYUSER, {
    variables: { userId: user?._id },
    skip: user ? false : true,
  });
  useEffect(() => {
    console.log({ noteArr });
  }, [noteArr]);
  useEffect(() => {
    console.log({ noteCoDat: data?.getAllNoteByUser });
    if (data) {
      setNoteArr(data.getAllNoteByUser);
    }
  }, [data]);
  return (
    <NoteContext.Provider value={{ noteArr, setNoteArr }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNote = () => useContext(NoteContext);
