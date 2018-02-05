import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class CheckServerRenderer extends React.Component {
  componentDidMount() {
    const { isServer, setToClient } = this.props;

    if (isServer) {
      setToClient();
    }
  }

  render() {
    const { isServer, render } = this.props;

    return render(isServer);
  }
}

const envQuery = gql`
  query IsServer {
    environment @client {
      isServer
    }
  }
`;

const envMutation = gql`
  mutation SetEnvToClient {
    setEnvToClient @client
  }
`;

export const CheckServer = compose(
  graphql(envQuery, {
    props: ({ data, owmProps }) => ({
      isServer: (() => {
        try {
          return data.environment.isServer;
        } catch (e) {
          return true;
        }
      })(),
    }),
  }),
  graphql(envMutation, {
    props: ({ mutate, ownProps }) => ({ setToClient: mutate }),
  }),
)(CheckServerRenderer);

// import { isServer } from './utils/isServer';

// export class CheckServer extends React.Component {
//   state = {
//     isServer: true,
//   };

//   componentDidMount() {
//     const { isServer } = this.state;

//     if (isServer) {
//       this.setState({ isServer: false });
//     }
//   }

//   render() {
//     const { isServer } = this.state;
//     const { render } = this.props;

//     return render(isServer);
//   }
// }
