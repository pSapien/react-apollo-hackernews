const path = require('path');
const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./prisma/generated/prisma.client');
const { Query, User, Link, Mutation } = require('./resolvers');

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'schema.graphql'),
  resolvers: { Query, User, Link, Mutation },
  context: request => ({ ...request, prisma }),
});

server.start(() => console.log('Server is now running. Yeah!'));
