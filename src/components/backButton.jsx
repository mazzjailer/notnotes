'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { usePathname } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const path = usePathname();

  const handleBack = () => {
    router.push('/notes');
  };
  return (
    <button 
      onClick={handleBack}
      className={`text-black dark:text-white text-xl p-3 pl-0 hover:cursor-pointer hover:shadow hover:bg-neutral-50 hover:rounded-2xl flex flex-nowrap items-center justify-center inset-shadow-sm dark:hover:bg-neutral-950 dark:shadow-neutral-700 ${path === '/notes' || path === '/' ? 'hidden' : 'block'}`}
    >
      <IoIosArrowBack className='text-3xl' />Back
    </button>
  )
}
