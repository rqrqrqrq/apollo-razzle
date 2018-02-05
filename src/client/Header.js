import React from 'react';
import styled from 'styled-components';
import { CheckServer } from './CheckServer';

const Heading = styled.h1`
  background-color: ${({ isServer }) => (isServer ? 'grey' : 'lightblue')};
  transition: background-color 1s;
`;

export const Header = ({ children }) => (
  <CheckServer
    render={isServer => <Heading isServer={isServer}>{children}</Heading>}
  />
);
