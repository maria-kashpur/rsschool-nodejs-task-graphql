import { GraphQLObjectType } from 'graphql';

const rootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    // createUser: {},
    // changeUser: {},
    // deleteUser: {},
    // createPost: {},
    // changePost: {},
    // deletePost: {},
    // createProfile: {},
    // changeProfile: {},
    // deleteProfile: {},
    // subscribeTo: {},
    // unsubscribeFrom: {},
  },
});

export default rootMutation;