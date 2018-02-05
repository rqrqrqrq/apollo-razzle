import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Store = ({ data }) => {
  if (data.loading) {
    return 'Loading';
  }

  if (data.error) {
    return 'errr';
  }

  return <ul>{data.items.map(item => <li key={item.id}>{item.name}</li>)}</ul>;
};

const itemsQuery = gql`
  query GetItems {
    items {
      id
      name
    }
  }
`;

export default graphql(itemsQuery)(Store);
