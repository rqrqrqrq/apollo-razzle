import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  background-color: ${({ isServer }) => (isServer ? 'grey' : 'lightblue')};
  transition: background-color 0.3s;
`;

export class Header extends React.Component {
  state = {
    isServer: true,
  };

  componentDidMount() {
    this.setState({ isServer: false });
  }

  render() {
    const { isServer } = this.state;

    return <Heading isServer={isServer}>Title</Heading>;
  }
}
