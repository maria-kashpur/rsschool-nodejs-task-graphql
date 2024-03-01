import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { ChangeUserInputType, UserType, createUserInputType } from '../user.js';
import { UUIDType } from '../uuid.js';
import { ChangePostInputType, CreatePostInputType, PostType } from '../post.js';
import { ProfileType, changeProfileInputType, createProfileInputType } from '../profile.js';

const id = { type: new GraphQLNonNull(UUIDType) };

const rootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    createUser: {
      type: UserType,
      args: {
        dto: { type: createUserInputType },
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id,
        dto: { type: ChangeUserInputType },
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id,
      },
    },
    createPost: {
      type: PostType,
      args: {
        dto: { type: CreatePostInputType },
      },
    },
    changePost: {
      type: PostType,
      args: {
        id,
        dto: { type: ChangePostInputType },
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id,
      },
    },
    createProfile: {
      type: ProfileType,
      args: {
        dto: { type: createProfileInputType },
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id,
        dto: { type: changeProfileInputType },
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id,
      },
    },
    subscribeTo: {
      type: UserType,
      args: {
        userId: id,
        authorId: id,
      },
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: {
        userId: id,
        authorId: id,
      },
    },
  },
});

export default rootMutation;