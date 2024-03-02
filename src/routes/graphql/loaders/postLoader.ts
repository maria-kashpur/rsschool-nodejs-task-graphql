import { PrismaClient, Post } from '@prisma/client';
import DataLoader from 'dataloader';

const postLoader = async (prisma: PrismaClient) => {
  return new DataLoader<string, Post[]>(async (userIds: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: {
        authorId: {
          in: [...userIds],
        },
      },
    });

    const postsMap = posts.reduce((acc, post) => {
      if (acc.has(post.authorId)) {
        const posts = acc.get(post.authorId).concat(post);
        acc.set(post.authorId, posts);
      } else {
        acc.set(post.authorId, [post]);
      }
      return acc;
    }, new Map());

    return userIds.map((userID) => (postsMap.has(userID) ? postsMap.get(userID) : []));
  });
};

export default postLoader;
