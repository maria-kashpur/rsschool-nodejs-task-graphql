import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UUIDType } from "./uuid.js";
import { Post } from "@prisma/client";
import { Context } from "../index.js";

const id = { type: new GraphQLNonNull(UUIDType) };
const title = { type: new GraphQLNonNull(GraphQLString) };
const content = { type: GraphQLString };

export const PostType = new GraphQLObjectType<Post, Context>({
  name: 'Post',
  fields: () => ({
    id,
    title,
    content,
  }),
});

export const PostsType = new GraphQLList(PostType);
