import { defineCollection, z } from "astro:content";

const items = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    number: z.number(),
    price: z.string(),
    category: z.enum([
      "Cafés",
      "Cocteles",
      "Batidos-Zumos",
      "Tortitas",
      "Tostadas",
      "Sandwiches",
      "Croissants",
      "Yogures-Granolas-Bowls",
    ]),
    subcategory: z
      .enum(["Batidos", "Zumos", "Dulces", "Saladas", "Salados", "Yogures", "Bowls", "Granolas"])
      .optional(),
    alcohol: z.boolean().optional(),
    description: z.string(),
    image: z.string().optional(),
    active: z.boolean().optional(),
  }),
});

export const collections = { items };
