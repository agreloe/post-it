import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/prisma"
import { saltAndHashPassword } from "./utils/helper"

export const {
    handlers: {GET, POST},
    signIn,
    signOut,
    auth
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password", placeholder: "Password" }
        },
        authorize: async (credentials) => {
            if( !credentials || !credentials.email || !credentials.password) {
                return null;
            }

            const email = credentials.email as string;
            const hash = saltAndHashPassword(credentials.password);

            let user: any = await prisma.user.findUnique({
                where: {
                  email,
                },
              });

              if (!user) {
                user = await prisma.user.create({
                  data: {
                    email,
                    hashedPassword: hash,
                  },
                });
              } else {
                const isPasswordMatch = await bcrypt.compareSync(credentials.password as string, user.hashedPassword);
                if (!isPasswordMatch) {
                  throw new Error("Invalid password");
                }
              }

              return user;
        }

    })
  ],
})