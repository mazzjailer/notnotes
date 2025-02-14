'use client'
import React from 'react'
import SignOutButton from './signOutButton'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SignInOrSignOutButton = ({ session }) => {
  const path = usePathname();

  return (
    <div className={`flex flex-row w-full justify-end ${path === '/' ? 'block' : 'hidden'}`}>
      { session ? <SignOutButton styles='text-black hover:bg-gray-50 border border-transparent hover:border-gray-100 rounded-2xl border-none shadow-none text-xl p-3 hover:shadow font-normal' /> : <Link className='text-xl p-3 border border-transparent hover:border-gray-100 hover:bg-gray-50 hover:rounded-2xl hover:shadow flex flex-nowrap items-center justify-center text-center' href='/sign-in'>Sign in</Link> }
    </div>
  )
}

export default SignInOrSignOutButton