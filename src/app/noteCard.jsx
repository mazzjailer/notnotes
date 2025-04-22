'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import './globals.css'
import { TableCell, TableRow } from '@/components/ui/table'

const Card = (props) => {
  const router = useRouter();
  return (
    <TableRow onClick={() => router.push(`/notes/${props.push}`)} className='hover:cursor-pointer'>
      <TableCell className='bg-white shadow-sm dark:bg-neutral-900 rounded-2xl rounded-r-none px-7 py-2'>
        <h4 className='text-xl text-black dark:text-white font-medium break-words max-w-[150px] md:max-w-[500px]'>{props.title}</h4>
        <p className='text-lg text-neutral-800 dark:text-neutral-400 break-words max-w-[150px] md:max-w-[500px]'>{props.abstract}</p>
      </TableCell>
      <TableCell className='text-sm md:text-base shadow-sm bg-white dark:bg-neutral-900 rounded-r-2xl px-7 py-2'>
        <h4>📅&nbsp;{new Date (props.date).toLocaleString("en-GB")}</h4>
      </TableCell>
    </TableRow>
  )
}

export default Card