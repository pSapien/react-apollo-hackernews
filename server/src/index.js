const { GraphQLServer } = require('graphql-yoga');

const { prisma } = require('./prisma/generated/prisma.client');

const resolvers = {
  Query: {
    info: () => 'This is the API of a hackernews clone',
    feed: (root, args, ctx, info) => {
      return ctx.prisma.links();
    },
  },
  Mutation: {
    post: (root, args, ctx) => {
      const { url, description } = args;
      return ctx.prisma.createLink({ url, description });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log('Server is now running. Yeah!'));
