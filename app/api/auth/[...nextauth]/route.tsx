import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate"
import { compare } from "bcrypt";

const prisma = new PrismaClient()

const handler = NextAuth({

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await prisma.employee.findFirst({
                    where: {
                        username: credentials?.username,
                    },
                });

                const correctPassword = await compare(credentials?.password as string, user?.password ?? "");

                if (correctPassword) {
                    return {
                        name: user?.username,
                        position: user?.position
                    } as any;
                }
                return null
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.postion = user.position;
            }
            return token;
        },

        async session({ session, token }) {
            session.user.position = token.postion
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login"
    },
});

export { handler as GET, handler as POST }