import { GraphQLFieldResolver } from "graphql";
import { Context } from "../index.js";
import { Profile } from "@prisma/client";

const profileResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  profilesAll: async function (_source, _args, context): Promise<Profile[]> {
    return await context.prisma.profile.findMany();
  },

  profileByID: async function (_source, args: Profile, context): Promise<Profile | null> {
    const { id } = args;
    return await context.prisma.profile.findUnique({
      where: { id },
    });
  },

  createProfile: async function (_source, args, context): Promise<Profile> {
    const { dto } = args;

    return await context.prisma.profile.create({
      data: dto,
    });
  },

  changeProfile: async function (_source, args, context): Promise<Profile> {
    const { id, dto } = args;

    return await context.prisma.profile.update({
      where: { id },
      data: dto,
    });
  },

  deleteProfile: async function (_source, args, context): Promise<Boolean> {
    const { id } = args;
    try {
      await context.prisma.profile.delete({
        where: { id },
      });
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default profileResolvers;