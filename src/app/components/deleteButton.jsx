'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSolidTrashAlt } from "react-icons/bi";

const DeleteButton = (props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const Delete = () => {
    fetch('/api/notes/' + props.id, {
      method: 'DELETE',
    });
    router.push('/');
  }

  return (
    <>
      { isDeleting && <div className='flex flex-col bg-gray-200 shadow-inner p-9 rounded-2xl items-center justify-center z-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <h2 className='text-black text-2xl text-center mb-8'>Are you sure you want to delete this note?</h2>
        <div className='flex flex-row justify-center items-center'>
          <button className='p-3 m-1 mb-0 text-lg font-medium bg-gray-800 text-white rounded-2xl shadow-inner' onClick={() => setIsDeleting(false)}>Cancel</button>
          <button className='p-3 m-1 mb-0 text-lg font-medium bg-red-500 text-white rounded-2xl shadow-inner' onClick={Delete}>Delete</button>
        </div>
      </div>}
      <button onClick={() => setIsDeleting(true)} className='p-3 hover:bg-gray-100 hover:rounded-2xl hover:shadow-inner flex flex-nowrap items-center justify-center text-center'>
        <BiSolidTrashAlt className='text-2xl text-red-500' />
        <h4 className='ml-[6px] text-2xl text-black '>Delete</h4>
      </button>
    </>
  )
}

export default DeleteButton