'use server'
import React from 'react'
import DeleteButton from './deleteButton.jsx'
import BackButton from './backButton';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import HeaderTitleAndSearchBar from './headerTitleAndSearchBar';
import SignInOrSignOutButton from './signInOrSignOutButton';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <div className='flex flex-row container max-w-full items-center justify-center align-middle fixed z-50 bg-white shadow-[inset_0px_-1px_10px_rgba(0,0,0,0.1)]'>
      <div className='flex justify-between w-full p-4 pl-6 pr-6 md:pr-36 md:pl-36 border-b-[1px]'>
        <HeaderTitleAndSearchBar />
        <BackButton />
        <DeleteButton />
        <SignInOrSignOutButton session={session} />
      </div>
    </div>
  )
}

export default Header