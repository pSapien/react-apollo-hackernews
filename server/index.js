const { GraphQLServer } = require('graphql-yoga');

const resolvers = {
  Query: {
    info: () => 'This is the API of a hackernews clone',
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
  },
  Mutation: {
    post: (root, args, context) => {
      const { url, description } = args;
      return context.prisma.createLink({ url, description });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
});

server.start(() => console.log('Server is now running. Yeah!'));
