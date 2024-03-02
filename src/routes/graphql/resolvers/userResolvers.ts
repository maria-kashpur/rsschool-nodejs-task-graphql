import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { Context } from '../index.js';
import { SubscribersOnAuthors, User } from '@prisma/client';
import {
  ResolveTree,
  parseResolveInfo,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';
import { UsersType } from '../types/user.js';

const userResolvers: { [key: string]: GraphQLFieldResolver<unknown, Context> } = {
  usersAll: async function (_source, _args, context, info): Promise<User[]> {
    const parsedResolveInfo = parseResolveInfo(info);

    const { fields } = simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfo as ResolveTree,
      UsersType,
    );

    const users = await context.prisma.user.findMany({
      include: {
        userSubscribedTo: 'userSubscribedTo' in fields,
        subscribedToUser: 'subscribedToUser' in fields,
      },
    });

    users.forEach(async (user) => {
      (await context.userLoader).prime(user.id, user);
    });

    return users;
  },

  userById: async function (_source, args: User, context): Promise<User | null> {
    const { id } = args;
    return (await context.userLoader).load(id);
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

  userSubscribedTo: async function (
    source,
    _args,
    context,
  ): Promise<(User | Error)[] | null> {
    let subscribers: null | SubscribersOnAuthors[];

    if (
      typeof source === 'object' &&
      source &&
      'userSubscribedTo' in source &&
      Array.isArray(source.userSubscribedTo)
    ) {
      subscribers = source.userSubscribedTo;
    } else {
      subscribers = null;
    }

    return subscribers
      ? (await context.userLoader).loadMany(
          subscribers.map((subscriber) => subscriber.authorId),
        )
      : null;
  },

  subscribedToUser: async function (source, _args, context) {
    let subscribers: null | SubscribersOnAuthors[];

    if (
      typeof source === 'object' &&
      source &&
      'subscribedToUser' in source &&
      Array.isArray(source.subscribedToUser)
    ) {
      subscribers = source.subscribedToUser;
    } else {
      subscribers = null;
    }

    return subscribers
      ? (await context.userLoader).loadMany(
          subscribers.map((subscriber) => subscriber.subscriberId),
        )
      : null;
  },
};

export default userResolvers;
