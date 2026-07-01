import { defineCollection, z } from "astro:content";

const items = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    number: z.number(),
    price: z.string(),
    category: z.enum(["cafe", "cocteleria", "platos"]),
    description: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { items };
