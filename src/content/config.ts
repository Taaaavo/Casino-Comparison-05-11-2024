import { defineCollection } from 'astro:content';
import { HotelSchema } from '../d';

const casinos = defineCollection({
  type: 'data',
  schema: HotelSchema,
});

export const collections = { casinos };
