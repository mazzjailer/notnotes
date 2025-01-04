'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const onSearch = (e) => {
    e.preventDefault();
    const encodeSearchQuery = encodeURI(searchQuery);
    router.push(`/?search=${encodeSearchQuery}`);
  }

  return (
    <form className='flex flex-row items-center shadow-inner bg-gray-100 rounded-xl mb-7 w-full' onSubmit={onSearch}>
      <input
        type='text'
        placeholder="Search"
        rows="1"
        className='bg-[transparent] resize-none h-11 w-full outline-none p-4 rounded-xl'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type='submit' className=' shadow-sm flex items-center justify-center bg-white text-black text-base rounded-xl h-5 p-[16px] text-center align-middle mr-2'><Image width={20} height={20} src='/search.png' alt='Search icon'/></button>
    </form>
  )
}

export default Search;