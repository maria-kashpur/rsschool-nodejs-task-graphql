import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

const userLoader = async (prisma: PrismaClient) => {
  return new DataLoader<string, User>(async (userIds: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: [...userIds],
        },
      },
      include: {
        userSubscribedTo: true,
        subscribedToUser: true,
      },
    });

    const usersMap = users.reduce((acc, user) => {
      acc.set(user.id, user);
      return acc;
    }, new Map());

    return userIds.map((userId) => usersMap.get(userId));
  });
};

export default userLoader;
