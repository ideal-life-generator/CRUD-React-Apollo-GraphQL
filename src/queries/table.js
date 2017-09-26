import { gql } from 'react-apollo';

export const table = gql`
  query table($orderProperty: String!, $orderDirection: String!) {
    table(orderBy: { property: $orderProperty, direction: $orderDirection }) {
      id,
      name,
    },
  },
`;

export const createRow = gql`
  mutation createRow($name: String!) {
    createRow(name: $name) {
      id,
      name,
    }
  }
`;

export const deleteRow = gql`
  mutation deleteRow($id: ID!) {
    deleteRow(id: $id) {
      id,
    }
  }
`;
