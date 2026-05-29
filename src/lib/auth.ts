import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Логин", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const handle = credentials.username.trim();
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: handle },
              { email: handle.toLowerCase() },
            ],
          },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;

        return {
          id: user.id,
          name: user.displayName,
          email: user.email,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = (user as { id: string }).id;
        token.username = (user as { username?: string }).username;
        token.role = (user as { role?: string }).role;
      }
      if (trigger === "update" && token.id) {
        const fresh = await prisma.user.findUnique({ where: { id: token.id as string } });
        if (fresh) {
          token.role = fresh.role;
          token.name = fresh.displayName;
          token.username = fresh.username;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = (token.role as string) || "user";
      }
      return session;
    },
  },
};
