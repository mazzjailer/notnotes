import React from 'react'
import Header from '../components/header'

const NotFound = () => {
  return (
    <>
      <div className='flex flex-row rounded-2xl items-center justify-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' ><h4 className='text-black text-2xl'>The requested page does not exist!</h4></div>
    </>
  )
}

export default NotFound