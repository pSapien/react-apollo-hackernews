const { GraphQLServer } = require('graphql-yoga');

let links = [
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

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => 'This is the hackernews clone',
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const { url, description } = args;
      const link = {
        id: `link-${idCount++}`,
        description,
        url,
      };

      links.push(link);
      return link;
    },

    updateLink: (parent, args) => {
      const { id, url, description } = args;

      links = [...links.filter(l => l.id !== id), { id, url, description }];

      return { id, url, description };
    },

    deleteLink: (parent, args) => {
      const { id } = args;
      links = links.filter(l => l.id !== id);
      return { id };
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
});

server.start(() => console.log('Server is now running. Yeah!'));
