import { makeExecutableSchema } from 'graphql-tools';

const items = [
  { id: 1, name: 'test' },
  { id: 2, name: 'another test' },
  { id: 3, name: 'yoba' },
];

const typeDefs = `
  type Item {
    id: Int!
    name: String!
  }

  type Query {
    hello: String!
    items: [Item]!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'HOME',
    items: () => items,
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
