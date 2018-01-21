import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Home = ({ data }) => {
  if (data.loading) {
    return 'Loading';
  }

  if (data.error) {
    return 'errr';
  }

  return <h1>{data.hello}</h1>;
};

const helloQuery = gql`
  query hello {
    hello
  }
`;

export default graphql(helloQuery)(Home);
