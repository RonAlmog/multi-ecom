import config from "@payload-config";
import { getPayload } from "payload";

const categories = [
  {
    name: "All",
    slug: "all",
  },
  {
    name: "Business & money",
    slug: "business-money",
    color: "#FFb347",
    subcategories: [
      {
        name: "Accounting",
        slug: "accounting",
      },
      {
        name: "Enterpreneurship",
        slug: "enterpreneurship",
      },
      {
        name: "Marketing & Sales",
        slug: "marketing",
      },
      {
        name: "Networking & Career",
        slug: "netowrking",
      },
    ],
  },
  {
    name: "Software Development",
    slug: "software",
    color: "#FF6B6B",
    subcategories: [
      {
        name: "Python",
        slug: "python",
      },
      {
        name: "Web Development",
        slug: "wen",
      },
      {
        name: "Backend with FastAPI",
        slug: "fastapi",
      },
      {
        name: "DevOps",
        slug: "devops",
      },
    ],
  },
];

const seed = async () => {
  const payload = await getPayload({ config });
  try {
    for (const cat of categories) {
      const parent = await payload.create({
        collection: "categories",
        data: {
          name: cat.name,
          slug: cat.slug,
          color: cat.color,
          parent: null,
        },
      });
      // for that parent, create children
      for (const subcat of cat.subcategories || []) {
        await payload.create({
          collection: "categories",
          data: {
            name: subcat.name,
            slug: subcat.slug,
            parent: parent.id,
          },
        });
      }
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    process.exit(1);
  }
  process.exit(0);
};

await seed();
