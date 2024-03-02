import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

const memberLoader = async (prisma: PrismaClient) => {
  return new DataLoader<string, MemberType>(async (memberIds: readonly string[]) => {
    const members = await prisma.memberType.findMany({
      where: {
        profiles: {
          some: {
            memberTypeId: {
              in: [...memberIds],
            },
          },
        },
      },
    });

    const membersMap = members.reduce((acc, member) => {
      acc.set(member.id, member);
      return acc;
    }, new Map());

    return memberIds.map((memberId) =>
      membersMap.has(memberId) ? membersMap.get(memberId) : null,
    );
  });
};

export default memberLoader;
