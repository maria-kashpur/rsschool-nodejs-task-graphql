import { GraphQLFieldResolver } from "graphql";
import { Context } from "../index.js";

const subscriptionResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  subscribeTo: async function (_source, args, context) {
    const { userId, authorId } = args;

    await context.prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: userId,
        authorId: authorId,
      },
    });

    return (await context.userLoader).load(userId);
  },

  unsubscribeFrom: async function (_source, args, context): Promise<Boolean> {
    const { userId, authorId } = args;
    try {
      await context.prisma.subscribersOnAuthors.delete({
        where: {
          subscriberId_authorId: {
            subscriberId: userId,
            authorId: authorId,
          },
        },
      });

      return true;
    } catch (e) {
      return false;
    }
  },
};

export default subscriptionResolvers;