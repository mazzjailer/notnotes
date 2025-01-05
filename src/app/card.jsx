'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import './globals.css'

const Card = (props) => {
  const router = useRouter();
  return (
    <tr onClick={() => router.push(`/notes/${props.push}`)} className='container w-full border-solid border-t border-b border-gray-200 hover:cursor-pointer hover:bg-gray-100 '>
      <td className='pr-6 pl-6 pt-2 pb-2'>
        <h4 className='text-xl text-black font-semibold'>{props.title}</h4>
        <p className='text-lg text-gray-800'>{props.abstract}</p>
      </td>
      <td className='pr-6 pl-6 pt-2 pb-2'>
        <h4>📅&nbsp;{props.date}</h4>
      </td>
    </tr>
  )
}

export default Card