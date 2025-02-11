import React from 'react'
import SessionProvider from './sessionContext'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const Session = async ({children}) => {
  const session = await auth.api.getSession({
      headers: await headers(),
  })

  return (
    <SessionProvider initialSession={session}>
      {children}
    </SessionProvider>
  )
}

export default Session