import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const Title = styled.h1`
  color: hotpink;
`;

const Home = ({ data }) => {
  if (data.loading) {
    return 'Loading';
  }

  if (data.error) {
    return 'Error';
  }

  return <Title>{data.hello}</Title>;
};

const helloQuery = gql`
  query hello {
    hello
  }
`;

export default graphql(helloQuery)(Home);
