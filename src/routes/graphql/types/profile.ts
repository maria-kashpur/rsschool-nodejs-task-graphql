import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberType, MemberTypeId } from "./member.js";
import { Profile } from "@prisma/client";
import { Context } from "../index.js";

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
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);
