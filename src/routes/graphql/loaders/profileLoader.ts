import { PrismaClient, Profile } from '@prisma/client';
import DataLoader from 'dataloader';

const profileLoader = async (prisma: PrismaClient) => {
  return new DataLoader<string, Profile>(async (userIds: readonly string[]) => {
    const profiles = await prisma.profile.findMany({
      where: {
        userId: {
          in: [...userIds],
        },
      },
    });

    const profilesMap = profiles.reduce((acc, profile) => {
      acc.set(profile.userId, profile);
      return acc;
    }, new Map());

    return userIds.map((userId) =>
      profilesMap.has(userId) ? profilesMap.get(userId) : null,
    );
  });
};

export default profileLoader;
