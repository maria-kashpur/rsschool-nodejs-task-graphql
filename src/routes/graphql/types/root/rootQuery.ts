import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType, UsersType } from '../user.js';
import { UUIDType } from '../uuid.js';
import { PostType, PostsType } from '../post.js';
import { ProfileType, ProfilesType } from '../profile.js';
import { MemberType, MemberTypeId, MemberTypesType } from '../member.js';
import postResolvers from '../../resolvers/postResolvers.js';
import profileResolvers from '../../resolvers/profileResolers.js';
import userResolvers from '../../resolvers/userResolvers.js';

const id = { type: new GraphQLNonNull(UUIDType) };
const title = { type: new GraphQLNonNull(GraphQLString) };
const content = { type: GraphQLString };
const authorId = { type: new GraphQLNonNull(UUIDType) };

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id,
      },
      resolve: userResolvers.userById,
    },
    users: {
      type: UsersType,
      resolve: userResolvers.userById,
    },

    post: {
      type: PostType,
      args: {
        id,
      },
      resolve: postResolvers.postById,
    },

    posts: {
      type: PostsType,
      resolve: postResolvers.postsAll,
    },

    profile: {
      type: ProfileType,
      args: {
        id,
      },
      resolve: profileResolvers.profileByID,
    },

    profiles: {
      type: ProfilesType,
      resolve: profileResolvers.profilesAll,
    },

    memberType: {
      type: MemberType,
      args: {
        id: {
          type: MemberTypeId,
        },
      },
    },
    memberTypes: {
      type: MemberTypesType,
    },
  },
});

export default rootQuery;
