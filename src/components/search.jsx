'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IoSearch } from "react-icons/io5";
import { usePathname } from 'next/navigation';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef(null);
  const path = usePathname();

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
    router.push(`/notes?search=${encodeSearchQuery}`);
    setIsOpen(false);
  }

  return (
    <>
      <div className={`cursor-pointer ${path === '/notes' ? 'block' : 'hidden'}`} onClick={() => setIsOpen(true)}>
        <div className='shadow flex items-center justify-center bg-neutral-50 text-black text-base rounded-xl h-5 p-[16px] text-center align-middle mr-2 dark:shadow-neutral-700'><IoSearch className='text-xl' /></div>
        </div>
      { isOpen && <div className='fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50'>
        <form className='flex flex-row items-center shadow-inner bg-white text-black rounded-xl mb-7 w-4/5 md:w-1/2' onSubmit={onSearch} ref={searchRef}>
          <input
            type='text'
            placeholder="Search"
            rows="1"
            className='bg-[transparent] resize-none h-11 w-full outline-none p-4 rounded-xl'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type='submit' className='shadow flex items-center justify-center bg-black text-white text-base rounded-xl h-5 p-[16px] text-center align-middle mr-2'><IoSearch className='text-xl' /></button>
        </form>
      </div> }
    </>
  )
}

export default Search;