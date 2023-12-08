import { NavbarItem } from '@nextui-org/react';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT }  from 'next-auth/jwt'

declare module 'next-auth' {
    interface Session {
        user: {
            name: string
            position: string
        }
    }

    interface User extends DefaultUser {
        name: string
        position: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        name: string
        postion: string   
    }
}