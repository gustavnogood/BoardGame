// queries.js

import { gql } from 'graphql-tag';

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      name
      category
      numberOfPlayers
      time
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($input: CreateGameInput!) {
    createGame(input: $input) {
      id
      name
      category
      numberOfPlayers
      time
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;
