import React from 'react'
import Link from 'next/link'
import DeleteButton from './deleteButton.jsx'

const Header = (props) => {

  return (
    <>
      <div className='flex justify-between p-4 pl-8 pr-8 md:p-4 md:pr-36 md:pl-36 border-b-[1px]'>
        <Link href='/' className='text-black text-2xl font-bold p-3 hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:shadow-inner' >&lt; Back</Link>
        { props.notePage && <DeleteButton id={props.id} /> }
      </div>
    </>
  )
}

export default Header