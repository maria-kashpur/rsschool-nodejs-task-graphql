import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType, UsersType } from '../user.js';
import { UUIDType } from '../uuid.js';
import { PostType, PostsType } from '../post.js';
import { ProfileType, ProfilesType } from '../profile.js';
import { MemberType, MemberTypeId, MemberTypesType } from '../member.js';
import postResolvers from '../../resolvers/postResolvers.js';

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
    },
    users: {
      type: UsersType,
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
      resolve: postResolvers.postsAll
    },
    profile: {
      type: ProfileType,
      args: {
        id,
      },
    },
    profiles: {
      type: ProfilesType,
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
