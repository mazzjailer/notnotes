'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSearch = (e) => {
    e.preventDefault();
    const encodeSearchQuery = encodeURI(searchQuery);
    router.push(`/?search=${encodeSearchQuery}`);
    setIsOpen(false);
  }

  return (
    <>
      <div className='cursor-pointer' onClick={() => setIsOpen(true)}>
        <div className='shadow border border-gray-100 flex items-center justify-center bg-gray-50 text-black text-base rounded-xl h-5 p-[16px] text-center align-middle mr-2'><IoSearch className='text-xl' /></div>
        </div>
      { isOpen && <div className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50'>
        <form className='flex flex-row items-center shadow-inner bg-white rounded-xl mb-7 w-4/5 md:w-1/2' onSubmit={onSearch} ref={searchRef}>
          <input
            type='text'
            placeholder="Search"
            rows="1"
            className='bg-[transparent] resize-none h-11 w-full outline-none p-4 rounded-xl'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type='submit' className='shadow border flex items-center justify-center bg-gray-100 text-black text-base rounded-xl h-5 p-[16px] text-center align-middle mr-2 border-gray-200'><IoSearch className='text-xl' /></button>
        </form>
      </div> }
    </>
  )
}

export default Search;