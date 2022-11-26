import { z } from 'zod';

import { prisma } from '../common/db';
import { router, publicProcedure, protectedProcedure } from '../trpc-server';

export const commentRouter = router({
  forest: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const result = await prisma.comment.findMany({
        where: {
          page: {
            url: input.url,
          },
          parentId: null,
        },
        include: {
          user: true,
          likes: true,
          replies: {
            include: {
              user: true,
              likes: true,
              replies: {
                include: {
                  user: true,
                  likes: true,
                  replies: {
                    include: {
                      user: true,
                      replies: true,
                      likes: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return result;
    }),
  timeline: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const result = await prisma.comment.findUnique({
        where: {
          id: input.id,
        },
        include: {
          user: true,
          likes: true,
          replies: {
            include: {
              user: true,
              likes: true,
              replies: {
                include: {
                  user: true,
                  likes: true,
                  replies: {
                    include: {
                      user: true,
                      replies: true,
                      likes: true,
                    },
                  },
                },
              },
            },
          },
          parent: {
            include: {
              user: true,
              likes: true,
              parent: {
                include: {
                  user: true,
                  likes: true,
                  parent: {
                    include: {
                      user: true,
                      parent: true,
                      likes: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return result;
    }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.any(),
        pageId: z.string(),
        parentId: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const data = await prisma.comment.create({
        data: {
          content: input.content,
          pageId: input.pageId,
          parentId: input.parentId,
          userId: ctx.session.user.id,
        },
      });
      return data;
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      // Soft delete
      const data = await prisma.comment.updateMany({
        where: {
          id: input,
          userId: ctx.session.user.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return data;
    }),
});
