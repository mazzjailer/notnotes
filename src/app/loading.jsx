import React from 'react'
import { FiLoader } from "react-icons/fi";

const Loading = () => {
  return (
    <div className='flex flex-row bg-white dark:bg-neutral-900 border shadow dark:border-none p-6 rounded-2xl items-center justify-center z-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' ><FiLoader className='text-black dark:text-white text-xl animate-spin mr-2' /><h4 className='text-black dark:text-white text-xl'>Loading...</h4></div>
  )
}

export default Loading