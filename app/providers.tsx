'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'

export function AppProviders({children, session}: any) {
    return (
        <SessionProvider session={session}>
            <NextUIProvider>
                {children}
            </NextUIProvider>
        </SessionProvider> 
    )
}