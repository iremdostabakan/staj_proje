// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, SessionStrategy } from "next-auth";
import { checkRateLimit, resetRateLimit, getRemainingTime } from "../../../../lib/rateLimit";

/**
 * authOptions'ı AuthOptions tipi ile export ediyoruz.
 * Böylece diğer dosyalar import edebilir: import { authOptions } from "../auth/[...nextauth]/route";
 */ 
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Girişi",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Şifre", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        const { email, password } = credentials ?? {};
        if (!email || !password) throw new Error("Email ve şifre boş olamaz");

        // x-forwarded-for okuma: hem obj hem get fonksiyonu olasılığına karşı
        // @ts-ignore
        const forwarded = req?.headers?.["x-forwarded-for"] ?? (typeof req?.headers?.get === "function" && req.headers.get("x-forwarded-for"));
        const ip = forwarded ? String(forwarded).split(",")[0].trim() : "unknown";

        const rate = checkRateLimit(ip, 5, 60 * 1000);
        if (!rate.allowed) {
          const retryAfter = rate.retryAfter ?? getRemainingTime(ip, 60 * 1000) ?? 60;

          throw new Error(`Çok fazla giriş denemesi yaptınız. Lütfen ${retryAfter} saniye bekleyin.`);
        }

        // Basit örnek kimlik doğrulama; gerçek projede DB kullan
        if (email === "admin@gmail.com" && password === "admin123") {
          resetRateLimit(ip);
          return { id: "1", name: "Admin", email: "admin@gmail.com" };
        }

        return null;
      },
    }),
  ],
secret: process.env.NEXTAUTH_SECRET,
  session: {
    // TS uyumu için explicit cast
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60,
  },

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) (token as any).id = (user as any).id;
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) (session.user as any).id = (token as any).id as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
