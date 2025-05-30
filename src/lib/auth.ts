import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./db/actions/user.action";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }
        const { email, password } = credentials;

        try {
          const userDoc = await login(email, password);
          if (!userDoc) return null;
          return {
            id: userDoc._id?.toString(),
            name: userDoc.name,
            email: userDoc.email,
          };
        } catch (error) {
          if (error instanceof Error) {
            console.error("Authorization error:", error.message);
          }
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (typeof token?.provider === "string") {
        session.provider = token.provider;
      }
      return session;
    },
  },
};
