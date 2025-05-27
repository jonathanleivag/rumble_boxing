import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_INSTAGRAM_USERNAME: z.string(),
  NEXT_PUBLIC_FACEBOOK_USERNAME: z.string(),
  NEXT_PUBLIC_PHONE: z.string(),
  NEXT_PUBLIC_MESSAGE: z.string(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_INSTAGRAM_USERNAME: process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME,
  NEXT_PUBLIC_FACEBOOK_USERNAME: process.env.NEXT_PUBLIC_FACEBOOK_USERNAME,
  NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE,
  NEXT_PUBLIC_MESSAGE: process.env.NEXT_PUBLIC_MESSAGE,
});
