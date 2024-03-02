import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import { PrismaClient } from '@prisma/client';
import depthLimit from 'graphql-depth-limit';
import userLoader from './loaders/userLoader.js';
import memberLoader from './loaders/memberLoader.js';
import postLoader from './loaders/postLoader.js';
import profileLoader from './loaders/profileLoader.js';

export interface Context {
  prisma: PrismaClient;
  userLoader: ReturnType<typeof userLoader>;
  memberLoader: ReturnType<typeof memberLoader>;
  postLoader: ReturnType<typeof postLoader>;
  profileLoader: ReturnType<typeof profileLoader>;
}

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const source = req.body.query;
      const variableValues = req.body.variables;
      const contextValue: Context = {
        prisma,
        userLoader: userLoader(prisma),
        memberLoader: memberLoader(prisma),
        postLoader: postLoader(prisma),
        profileLoader: profileLoader(prisma),
      };

      const graphQLArgs = {
        schema,
        source,
        contextValue,
        variableValues,
      };

      const errors = validate(schema, parse(source), [depthLimit(5)]);
      if (errors && errors.length > 0) {
        return { data: null, errors: errors };
      }
      return await graphql(graphQLArgs);
    },
  });
};

export default plugin;
