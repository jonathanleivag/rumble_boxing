import type { NextConfig } from "next";

const requiredEnv = [
  "NEXT_PUBLIC_INSTAGRAM_USERNAME",
  "NEXT_PUBLIC_FACEBOOK_USERNAME",
  "NEXT_PUBLIC_PHONE",
  "NEXT_PUBLIC_MESSAGE",
];

requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is required but not set.`);
  }
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
