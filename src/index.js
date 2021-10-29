import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./context/NoteContext/noteContext";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  from,
  HttpLink,
} from "@apollo/client";
import { ErrorLink, onError } from "@apollo/client/link/error";
import { UserProvider } from "./context/UserContext/userContext";
import ToggleColorMode from "./App";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`GraphQl error ${message}`);
    });
  }
});

const link = from([
  ErrorLink,
  new HttpLink({
    uri: "https://UtilizedWillingScientificcomputing.kinshukshah.repl.co/graphql",
  }),
]);

const client = new ApolloClient({
  uri: "https://keepnotes-backend.kinshukshah.repl.co/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query ($userId: ID!) {
//         getAllNoteByUser(userId: $userId) {
//           title
//         }
//       }
//     `,
//     variables: {
//       userId: "61629c4dbe8e5dba6bc8f426",
//     },
//   })
//   .then((result) => console.log(result));
// client
//   .query({
//     query: gql`
//       mutation ($email: String!, $password: String!) {
//         getAllNoteByUser(userId: $userId) {
//           title
//         }
//       }
//     `,
//     variables: {
//       userId: "61629c4dbe8e5dba6bc8f426",
//     },
//   })
//   .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <NoteProvider>
            <ToggleColorMode />
          </NoteProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
