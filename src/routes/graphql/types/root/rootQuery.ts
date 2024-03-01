import { GraphQLObjectType } from 'graphql';

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // user: {},
    // users: {},
    // post: {},
    // posts: {},
    // profile: {},
    // profiles: {},
    // memberType: {},
    // memberTypes: {},
  },
});

export default rootQuery;
