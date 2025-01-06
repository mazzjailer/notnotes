import React from 'react'
import Link from 'next/link'
import DeleteButton from './deleteButton.jsx'
import { IoIosArrowBack } from "react-icons/io";

const Header = (props) => {

  return (
    <>
      <div className='flex justify-between p-4 pl-8 pr-6 md:p-4 md:pr-36 md:pl-36 border-b-[1px]'>
        <Link href='/' className='text-black text-2xl p-3 pl-0 hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl hover:shadow-inner flex flex-nowrap items-center justify-center' ><IoIosArrowBack className='text-3xl' />Back</Link>
        { props.notePage && <DeleteButton id={props.id} /> }
      </div>
    </>
  )
}

export default Header