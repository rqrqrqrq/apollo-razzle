import { makeExecutableSchema } from 'graphql-tools';

const items = [
  { id: 1, name: 'te`st' },
  { id: 2, name: 'anot"her test' },
  { id: 3, name: "yob'a" },
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
