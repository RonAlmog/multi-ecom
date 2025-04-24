import { Category } from "@/payload-types";
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
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // depth is 1, so we are confident that doc is of type Category
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategorySlugs = [];

        const parentCategory = formattedData[0];
        if (parentCategory) {
          subcategorySlugs.push(
            ...parentCategory.subcategories.map((subcat) => subcat.slug)
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategorySlugs],
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
