import type { NextConfig } from "next";

const requiredEnv = [
  "NEXT_PUBLIC_INSTAGRAM_USERNAME",
  "NEXT_PUBLIC_FACEBOOK_USERNAME",
  "NEXT_PUBLIC_PHONE",
  "NEXT_PUBLIC_MESSAGE",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "NEXTAUTH_SECRET",
  "MONGODB_URI",
];

requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is required but not set.`);
  }
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
