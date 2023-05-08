'use client';
import { FC, ReactNode } from "react"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"


const AuthProvider: FC<{children: ReactNode, session?: Session}> = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {
        children
      }
    </SessionProvider>
  )
}

export default AuthProvider