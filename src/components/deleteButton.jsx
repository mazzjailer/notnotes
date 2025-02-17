'use client'
import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation'
import { BiSolidTrashAlt } from "react-icons/bi";
import { deleteFunction } from './deleteFunction.jsx'
import { FiLoader } from 'react-icons/fi';
import { usePathname } from 'next/navigation.js';

const DeleteButton = () => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [finalDelete, setFinalDelete] = useState(false);
  const path = usePathname();
  const [isNotePage, setIsNotePage] = useState(false);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    const match = path.match(/^\/notes\/(\d+)$/);
    if (match) {
      setIsNotePage(true);
      setNoteId(parseInt(match[1]));
    } else {
      setIsNotePage(false);
      setNoteId(null);
    }
  }, [path]);

  return (
    <div className={`${isNotePage ? 'flex' : 'hidden'}`}>
      { isDeleting && <div className='flex flex-col bg-neutral-100 shadow border p-5 md:p-9 rounded-2xl items-center justify-center z-5 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-1/3 dark:bg-neutral-900 dark:shadow-neutral-700'>
        <h2 className='text-black dark:text-white text-2xl text-center mb-8'>Are you sure you want to delete this note?</h2>
        <div className='flex flex-row justify-center items-center'>
          <button className='p-3 m-1 mb-0 text-lg font-medium bg-neutral-800 text-white rounded-2xl shadow dark:bg-white dark:text-black dark:shadow-neutral-700' onClick={() => setIsDeleting(false)}>Cancel</button>
          <button className='p-3 m-1 mb-0 text-lg font-medium bg-red-500 text-white rounded-2xl shadow' disabled={finalDelete} onClick={async () => {
            setFinalDelete(true)
            await deleteFunction(noteId)
            router.push('/notes');
            setFinalDelete(false);
            setIsDeleting(false);
          }}>{finalDelete ? ( <FiLoader className="animate-spin" /> ) : ("Delete")}</button>
        </div>
      </div>}
      <button onClick={() => setIsDeleting(true)} disabled={isDeleting} className='p-3 border-transparent hover:bg-neutral-50 hover:rounded-2xl hover:shadow flex flex-nowrap items-center justify-center text-center dark:hover:bg-neutral-950 dark:shadow-neutral-700'>
        <BiSolidTrashAlt className='text-xl text-red-500' />
        <h4 className='ml-[6px] text-xl '>Delete</h4>
      </button>
    </div>
  )
}

export default DeleteButton