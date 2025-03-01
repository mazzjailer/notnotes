'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import './globals.css'
import { TableCell, TableRow } from '@/components/ui/table'

const Card = (props) => {
  const router = useRouter();
  return (
    <TableRow onClick={() => router.push(`/notes/${props.push}`)} className='hover:cursor-pointer'>
      <TableCell className=''>
        <h4 className='text-xl text-black dark:text-white font-medium'>{props.title}</h4>
        <p className='text-lg text-neutral-800 dark:text-neutral-400'>{props.abstract}</p>
      </TableCell>
      <TableCell className='text-base'>
        <h4>📅&nbsp;{new Date (props.date).toLocaleString("en-GB")}</h4>
      </TableCell>
    </TableRow>
  )
}

export default Card