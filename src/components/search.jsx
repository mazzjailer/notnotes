'use client'
import React from 'react'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const searchRef = useRef(null);

  const onSearch = (e) => {
    e.preventDefault();
    const encodeSearchQuery = encodeURI(searchQuery);
    router.push(`/notes?search=${encodeSearchQuery}`);
  }

  return (
    <>
      <form className='flex flex-row items-center shadow-sm bg-white dark:bg-neutral-900 text-black rounded-xl w-full' onSubmit={onSearch} ref={searchRef}>
        <input
          type='text'
          placeholder="Search"
          rows="1"
          className='bg-[transparent] resize-none h-11 w-full outline-none p-4 rounded-xl dark:placeholder:text-neutral-600 placeholder:text-neutral-400 text-black dark:text-white'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type='submit' className='shadow flex items-center justify-center bg-black text-white text-base rounded-xl h-5 p-[16px] text-center align-middle mr-2'><IoSearch className='text-xl' /></button>
      </form>
    </>
  )
}

export default Search;