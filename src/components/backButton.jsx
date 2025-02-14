'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { usePathname } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const path = usePathname();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push('/');
    }
  };
  return (
    <button 
      onClick={handleBack}
      className={`text-black text-xl p-3 pl-0 hover:cursor-pointer hover:border-gray-100 hover:shadow hover:bg-gray-50 hover:rounded-2xl border border-transparent flex flex-nowrap items-center justify-center inset-shadow-sm ${path === '/' ? 'hidden' : 'block'}`}
    >
      <IoIosArrowBack className='text-3xl' />Back
    </button>
  )
}
