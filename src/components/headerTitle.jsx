'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSession } from '@/contexts/sessionContext'

const HeaderTitle = () => {
  const path = usePathname();
  const { session } = useSession();
  
  return (
    <div className={`flex flex-row items-center justify-start gap-2 md:gap-4 w-full ${path === '/' || path === '/notes' ? 'block' : 'hidden'}`}>
      <Link href={`${session ? '/notes' : '/'}`} className={`text-3xl md:text-5xl font-bold`}>notNotes</Link>
    </div>
  )
}

export default HeaderTitle