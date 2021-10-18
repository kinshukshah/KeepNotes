import { gql } from "@apollo/client";

export const GETALLNOTESBYUSER = gql`
  query ($userId: ID!) {
    getAllNoteByUser(userId: $userId) {
      title
      note 
      color
      isArchive
      isPinned
      label
      _id
    }
  }
`;
