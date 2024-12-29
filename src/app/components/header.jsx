import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <div className='flex p-6 pl-8 pb-0 md:p-8 md:pl-20'>
        <Link href='/' className='text-black text-2xl font-bold' >&lt; Back</Link>
      </div>
    </>
  )
}

export default Header