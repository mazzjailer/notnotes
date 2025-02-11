'use client'
import React, { useContext, createContext, useEffect, useState } from 'react'

const SessionContext = createContext();

const SessionProvider = ({children, initialSession}) => {
  const [session, setSession] = useState(initialSession);

  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}