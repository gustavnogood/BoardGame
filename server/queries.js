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

export const GET_USERS= gql`
  query GetUsers {
    users {
      id
      name
      image

    }
  }
`;