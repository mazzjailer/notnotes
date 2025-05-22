'use server'
import React from 'react'
import DeleteButton from './deleteButton.jsx'
import BackButton from './backButton';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import HeaderTitle from './headerTitle.jsx';
import SignInOrSignOutButton from './signInOrSignOutButton';
import ThemeToggle from './themeToggle';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className='flex flex-row container max-w-full items-center justify-center align-middle fixed z-50 bg-white shadow-[inset_0px_-1px_10px_rgba(0,0,0,0.09)] dark:bg-black dark:shadow-[inset_0px_-7px_10px_rgba(255,255,255,0.09)]'>
      <div className='flex flex-row items-center justify-between w-full p-4 pl-6 pr-6 md:pr-36 md:pl-36 border-b-[1px]'>
        <HeaderTitle />
        <BackButton />
        <div className='flex flex-row justify-end text-nowrap gap-1 md:gap-2'>
          <DeleteButton />
          <ThemeToggle />
          <SignInOrSignOutButton session={session} />
        </div>
      </div>
    </div>
  )
}

export default Header