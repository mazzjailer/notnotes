'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Search from './search'
import Link from 'next/link'

const HeaderTitleAndSearchBar = () => {
  const path = usePathname();
  
  return (
    <div className={`flex flex-row items-center justify-start gap-4 w-full ${path === '/' ? 'block' : 'hidden'}`}>
      <Link href='/' className='text-3xl md:text-5xl font-bold'>notNotes</Link>
      <Search />
    </div>
  )
}

export default HeaderTitleAndSearchBar