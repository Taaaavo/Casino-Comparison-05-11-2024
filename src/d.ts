import { z } from 'zod';

const AvailableGamesSchema = z.object({
  tableGames: z.array(z.string()).optional(),
  electronicCasinoGames: z.array(z.string()).optional(),
});

const FacilitySchema = z.object({
  title: z.string(),
  content: z.array(z.string()),
});

const AirportTransferSchema = z.object({
  standard: z.boolean(),
  premium: z.boolean(),
  vip: z.boolean(),
});

const PriceSchema = z.object({
  standard: z.number(),
  premium: z.number(),
  vip: z.number(),
});

const InfoSchema = z.object({
  address: z.string(),
  city: z.string(),
  map: z.string(),
  facilities: z.array(FacilitySchema),
  dressCode: z.string(),
  ageRestrictions: z.string(),
  availableGames: AvailableGamesSchema,
});

const PackagesSchema = z.object({
  price: PriceSchema,
  airportTransfer: AirportTransferSchema,
  breakfast: AirportTransferSchema,
  lunch: AirportTransferSchema,
  dinner: AirportTransferSchema,
  vipArea: AirportTransferSchema,
});

export const HotelSchema = z.object({
  hotelID: z.string(),
  hotelName: z.string(),
  tripadvisor_ranking: z.number(),
  mainDescription: z.string(),
  secondaryDescription: z.string(),
  reviews: z.number(),
  mainImage: z.string(),
  ribon: z.boolean(),
  ribon_content: z.enum(['Finest Choice!', 'People\u2019s Choice!', '']),
  images: z.array(z.any()),
  tripadvisor: z.string(),
  info: InfoSchema,
  packages: PackagesSchema,
});
