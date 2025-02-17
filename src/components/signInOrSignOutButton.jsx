'use client'
import React from 'react'
import SignOutButton from './signOutButton'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const SignInOrSignOutButton = ({ session }) => {
  const path = usePathname();

  return (
    <div className={`flex flex-row w-full justify-end ${path === '/notes' ? 'block' : 'hidden'}`}>
      { session ? <SignOutButton styles='text-black dark:text-white hover:bg-neutral-50 border border-transparent rounded-2xl border-none shadow-none text-md md:text-xl p-3 hover:shadow font-normal dark:hover:bg-neutral-950 dark:shadow-neutral-700' /> : <Link className='text-xl p-3 border border-transparent hover:bg-neutral-50 hover:rounded-2xl hover:shadow flex flex-nowrap items-center justify-center text-center dark:hover:bg-neutral-950 dark:shadow-neutral-700' href='/sign-in'>Sign in</Link> }
    </div>
  )
}

export default SignInOrSignOutButton