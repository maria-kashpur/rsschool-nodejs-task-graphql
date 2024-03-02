import { GraphQLFieldResolver } from "graphql";
import { Context } from "../index.js";
import { Post, User } from "@prisma/client";

const postResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  postsAll: async function (_source, _args, context): Promise<Post[]> {
    return await context.prisma.post.findMany();
  },

  postById: async function (_source, args: Post, context): Promise<Post | null> {
    const { id } = args;
    return await context.prisma.post.findUnique({
      where: { id },
    });
  },

  postByUserId: async function (source, _args, context): Promise<Post[]> {
    const { id } = source as User;
    return (await context.postLoader).load(id);
  },

  createPost: async function (_source, args, context): Promise<Post> {
    const { dto } = args;
    return await context.prisma.post.create({
      data: dto,
    });
  },

  changePost: async function (_source, args, context): Promise<Post> {
    const { id, dto } = args;
    return await context.prisma.post.update({
      where: { id },
      data: dto,
    });
  },

  deletePost: async function (_source, args, context): Promise<Boolean> {
    const { id } = args;
    try {
      await context.prisma.post.delete({
        where: { id },
      });

      return true;
    } catch (e) {
      return false;
    }
  },
};

export default postResolvers;