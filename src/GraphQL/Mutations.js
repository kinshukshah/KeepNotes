import { gql } from "@apollo/client";

export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($email: String! $password: String!) {
    loginUser(email: $email password: $password) {
      name
      _id
      email
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
  $email: String! 
  $password: String! 
  $name: String!
  ){
    createUser(
    email:$email 
    password:$password 
    name:$name
    ) {
      name
      _id
      email
    }
  }
`;

export const CREATE_NOTE_MUTATION = gql`
  mutation createNote(
    $userId: ID!
    $title: String!
    $note: String!
    $color: String!
    $isArchive: Boolean!
    $isPinned: Boolean!
    $label: String!
  ) {
    createNote(
      userId: $userId
      title: $title
      note: $note
      color: $color
      isArchive: $isArchive
      isPinned: $isPinned
      label: $label
    ) {
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

export const DELETE_NOTE_MUTATION = gql`
  mutation deleteNote(
  $noteId: ID! 
  ){
    deleteNote(
      noteId:$noteId 
    ) {
      _id
      title
      note
      color
      isArchive
      isPinned
      label
    }
  }
`;