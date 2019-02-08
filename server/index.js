const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'FullStack tutorial for Graphql',
  },
  {
    id: 'link-1',
    url: 'lallumiya.com',
    description: 'Hello there',
  },
];

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}`;

const resolvers = {
  Query: {
    info: () => 'This is the hackernews clone',
    feed: () => links,
  },
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url,
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log('Server is now running. Yeah!'));
