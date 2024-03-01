import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { User } from "@prisma/client";
import { Context } from "../index.js";
import { ProfileType } from "./profile.js";
import { PostsType } from "./post.js";

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
    },
    posts: {
      type: PostsType,
    },
    userSubscribedTo: {
      type: UsersType,
    },
    subscribedToUser: {
      type: UsersType,
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
