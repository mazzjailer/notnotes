'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Search from './search'
import Link from 'next/link'
import { useSession } from '@/contexts/sessionContext'

const HeaderTitleAndSearchBar = () => {
  const path = usePathname();
  const { session } = useSession();
  
  return (
    <div className={`flex flex-row items-center justify-start gap-4 w-full ${path === '/' || path === '/notes' ? 'block' : 'hidden'}`}>
      <Link href={`${session ? '/notes' : '/'}`} className={`text-3xl md:text-5xl font-bold`}>notNotes</Link>
      <Search />
    </div>
  )
}

export default HeaderTitleAndSearchBar