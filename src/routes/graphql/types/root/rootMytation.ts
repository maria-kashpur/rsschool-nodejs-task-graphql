import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ChangeUserInputType, UserType, createUserInputType } from '../user.js';
import { UUIDType } from '../uuid.js';
import { ChangePostInputType, CreatePostInputType, PostType } from '../post.js';
import { ProfileType, changeProfileInputType, createProfileInputType } from '../profile.js';
import postResolvers from '../../resolvers/postResolvers.js';
import profileResolvers from '../../resolvers/profileResolers.js';
import userResolvers from '../../resolvers/userResolvers.js';
import subscriptionResolvers from '../../resolvers/subscriptionResolvers.js';

const id = { type: new GraphQLNonNull(UUIDType) };

const rootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: { type: createUserInputType },
      },
      resolve: userResolvers.createUser,
    },
    changeUser: {
      type: UserType,
      args: {
        id,
        dto: { type: ChangeUserInputType },
      },
      resolve: userResolvers.changeUser,
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id,
      },
      resolve: userResolvers.deleteUser,
    },

    createPost: {
      type: PostType,
      args: {
        dto: { type: CreatePostInputType },
      },
      resolve: postResolvers.createPost,
    },

    changePost: {
      type: PostType,
      args: {
        id,
        dto: { type: ChangePostInputType },
      },
      resolve: postResolvers.changePost,
    },

    deletePost: {
      type: GraphQLBoolean,
      args: {
        id,
      },
      resolve: postResolvers.deletePost,
    },

    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: createProfileInputType },
      },
      resolve: profileResolvers.createProfile,
    },

    changeProfile: {
      type: ProfileType,
      args: {
        id,
        dto: { type: changeProfileInputType },
      },
      resolve: profileResolvers.changeProfile,
    },

    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id,
      },
      resolve: profileResolvers.deleteProfile,
    },

    subscribeTo: {
      type: UserType,
      args: {
        userId: id,
        authorId: id,
      },
      resolve: subscriptionResolvers.subscribeTo,
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: id,
        authorId: id,
      },
      resolve: subscriptionResolvers.unsubscribeFrom,
    },
  },
});

export default rootMutation;