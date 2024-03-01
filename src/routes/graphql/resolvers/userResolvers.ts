import { GraphQLFieldResolver } from "graphql";
import { Context } from "../index.js";
import { User } from "@prisma/client";

const userResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  usersAll: async function (_source, _args, context): Promise<User[]> {
    return await context.prisma.user.findMany();
  },

  userById: async function (_source, args: User, context): Promise<User | null> {
    const { id } = args;
    return await context.prisma.user.findUnique({
      where: { id },
    });
  },

  createUser: async function (_source, args, context): Promise<User | null> {
    const { dto } = args;
    return await context.prisma.user.create({
      data: dto,
    });
  },

  changeUser: async function (_source, args, context): Promise<User> {
    const { id, dto } = args;
    return await context.prisma.user.update({
      where: { id },
      data: dto,
    });
  },

  deleteUser: async function (_source, args, context): Promise<Boolean> {
    const { id } = args;
    try {
      await context.prisma.user.delete({
        where: { id },
      });

      return true;
    } catch (e) {
      return false;
    }
  },


};

export default userResolvers;