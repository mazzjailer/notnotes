'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const onSearch = (e) => {
    e.preventDefault();
    const encodeSearchQuery  = encodeURI(searchQuery);
    router.push(`/?search=${encodeSearchQuery}`);
  }

  return (
    <form onSubmit={onSearch}>
      <input
        type='text'
        placeholder="Search"
        rows="1"
        className='shadow-inner resize-none h-12 w-full outline-none bg-gray-100 p-4 rounded-xl mb-10'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  )
}

export default Search;