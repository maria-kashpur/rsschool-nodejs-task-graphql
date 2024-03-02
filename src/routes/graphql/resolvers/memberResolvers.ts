import { GraphQLFieldResolver } from "graphql";
import { Context } from "../index.js";
import { MemberType, Profile } from "@prisma/client";

const memberResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  memberTypeById: async function (
    _source,
    args: MemberType,
    context,
  ): Promise<MemberType | null> {
    const { id } = args;
    return (await context.memberLoader).load(id);
  },
  
  memberTypeByMemberTypeId: async function (source, _args, context) {
    const { memberTypeId } = source as Profile;
    return (await context.memberLoader).load(memberTypeId);
  },

  memberTypesAll: async function (_source, _args, context): Promise<MemberType[]> {
    return await context.prisma.memberType.findMany();
  },
};

export default memberResolvers;