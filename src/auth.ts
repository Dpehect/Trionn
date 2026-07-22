import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { env } from "@/lib/env";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const protectedPrefixes = ["/dashboard", "/admin"];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD) return null;

        const validEmail = parsed.data.email === env.ADMIN_EMAIL;
        const validPassword = parsed.data.password === env.ADMIN_PASSWORD;

        if (!validEmail || !validPassword) return null;

        return {
          id: "admin",
          email: env.ADMIN_EMAIL,
          name: "Administrator",
          role: "admin",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    jwt({ token, user }) {
      if (user && "role" in user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "admin";
        session.user.role = String(token.role ?? "user");
      }
      return session;
    },
    authorized({ auth, request }) {
      const isProtected = protectedPrefixes.some((prefix) =>
        request.nextUrl.pathname.startsWith(prefix)
      );
      return isProtected ? Boolean(auth?.user) : true;
    },
  },
});
