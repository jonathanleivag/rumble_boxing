import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client ID and Secret must be provided");
}

if (!process.env.NEXTAUTH_SECRET || !process.env.NEXTAUTH_URL) {
  throw new Error("NEXTAUTH_SECRET or NEXTAUTH_URL must be provided");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
