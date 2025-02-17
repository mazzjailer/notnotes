'use client'
import React from 'react'

const DateConverter = (props) => {
  return (
    <p className='p-2 pt-0 text-neutral-500 dark:text-neutral-400'>Last updated: {new Date (props.date).toLocaleString("en-GB")}</p>
  )
}

export default DateConverter