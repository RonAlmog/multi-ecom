import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}; // init where as empty, then add filters to it

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const category = categoriesData.docs[0];
        if (category) {
          where["category.slug"] = {
            equals: category.slug,
          };
        }
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // populate category, image
        pagination: true,
        where, // assigning the where built above
      });

      return data;
    }),
});
