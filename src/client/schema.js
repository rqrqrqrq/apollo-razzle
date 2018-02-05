export const resolvers = {
  Mutation: {
    setEnvToClient: (_, _vars, { cache }) => {
      const data = {
        environment: {
          __typename: 'EnvironmentType',
          isServer: false,
        },
      };

      cache.writeData({ data });

      return null;
    },
  },
};

export const defaults = {
  environment: {
    __typename: 'EnvironmentType',
    isServer: true,
  },
};
