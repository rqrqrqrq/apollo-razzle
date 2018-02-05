import { makeExecutableSchema } from 'graphql-tools';

const items = [
  { id: 1, name: 'te`st' },
  { id: 2, name: 'anot"her test' },
  { id: 3, name: "yob'a" },
];

const CommonInputFields = `
  name: String!
`;

const typeDefs = `
  input ItemInput {
    ${CommonInputFields}
  }

  type Item {
    id: Int!
    ${CommonInputFields}
  }

  type Environment {
    isServer: Boolean!
  }

  type Query {
    hello: String!
    items: [Item]!
    environment: Environment!
  }

  type Mutation {
    createItem(input: ItemInput!): Item
  }
`;

const resolvers = {
  Query: {
    hello: () => 'HOME',
    items: () => items,
    environment: () => ({
      // FIXME: preventing warnings in server console;
      isServer: true,
    }),
  },
  Mutation: {
    createItem: (_, { input }) => {
      const newItem = {
        id: items.reduce((id, item) => Math.max(id, item.id), 0) + 1,
        ...input,
      };

      items.push(newItem);

      return newItem;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
