import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./member.js";
import { Profile } from "@prisma/client";
import { Context } from "../index.js";
import memberResolvers from "../resolvers/memberResolvers.js";

const id = { type: new GraphQLNonNull(UUIDType) };
const isMale = { type: GraphQLBoolean };
const yearOfBirth = { type: GraphQLInt };
const userId = { type: UUIDType };
const memberTypeId = { type: MemberTypeId };

export const ProfileType = new GraphQLObjectType<Profile, Context>({
  name: 'Profile',
  fields: () => ({
    id,
    isMale,
    yearOfBirth,
    userId,
    memberTypeId,
    memberType: {
      type: MemberType,
      resolve: memberResolvers.memberTypeByMemberTypeId,
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);

export const createProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale,
    yearOfBirth,
    userId,
    memberTypeId,
  }),
});

export const changeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale,
    yearOfBirth,
    memberTypeId,
  }),
});
