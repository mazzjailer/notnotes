'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import './globals.css'

const Card = (props) => {
  const router = useRouter();
  return (
    <tr onClick={() => router.push(`/notes/${props.push}`)} className='container w-full border-solid border-t border-b border-neutral-200 hover:cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 '>
      <td className='pr-6 pl-6 pt-2 pb-2'>
        <h4 className='text-xl text-black dark:text-white font-medium'>{props.title}</h4>
        <p className='text-lg text-neutral-800 dark:text-neutral-400'>{props.abstract}</p>
      </td>
      <td className='pr-6 pl-6 pt-2 pb-2'>
        <h4>📅&nbsp;{new Date (props.date).toLocaleString("en-GB")}</h4>
      </td>
    </tr>
  )
}

export default Card