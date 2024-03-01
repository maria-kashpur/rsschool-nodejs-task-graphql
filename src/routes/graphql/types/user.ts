import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { User } from "@prisma/client";
import { Context } from "../index.js";
import { ProfileType } from "./profile.js";
import { PostsType } from "./post.js";
import profileResolvers from "../resolvers/profileResolers.js";
import postResolvers from "../resolvers/postResolvers.js";
import userResolvers from "../resolvers/userResolvers.js";

const id = { type: new GraphQLNonNull(UUIDType) };
const name = { type: new GraphQLNonNull(GraphQLString) };
const balance = { type: new GraphQLNonNull(GraphQLFloat) };

export const UserType = new GraphQLObjectType<User, Context>({
  name: 'User',
  fields: () => ({
    id,
    name,
    balance,
    profile: {
      type: ProfileType,
      resolve: profileResolvers.profileByID,
    },
    posts: {
      type: PostsType,
      resolve: postResolvers.postById, //????
    },
    userSubscribedTo: {
      type: UsersType,
      resolve: userResolvers.userSubscribedTo,
    },
    subscribedToUser: {
      type: UsersType,
      resolve: userResolvers.subscribedToUser,
    },
  }),
});

export const UsersType = new GraphQLList(UserType);

export const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name,
    balance,
  }),
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name,
    balance: { type: GraphQLFloat },
  }),
});
