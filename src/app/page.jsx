import Card from './card'
import Link from 'next/link'
import './globals.css'
import { PrismaClient } from '@prisma/client'
import { sort } from 'fast-sort'

export default async function App( {searchParams} ) {

  const prisma = new PrismaClient()
  const notes = await prisma.note.findMany()
  const { sortOrder = '' } = await searchParams;
  const sortedNotes = sort(notes).desc(sortOrder === 'title' ? note => note.title : note => note.date)

  return (
    <>
      <div className='p-6 pt-16 md:p-36 md:pt-20'>
      <h1 className='text-5xl text-black font-bold mb-6'>notNotes</h1>
        <div className=''>
          <form>
            <input type='text' placeholder="Search" rows="1" className='shadow-inner resize-none h-12 w-full outline-none bg-gray-100 p-4 rounded-xl mb-10'></input>
          </form>
        </div>
        <table className='w-full'>
          <thead className='text-left text-gray-600 text-lg'>
            <tr>
              <th>
                <Link className='p-5' href="/?sortOrder=title">Title</Link>
              </th>
              <th>
                <Link className='p-5' href="/?sortOrder=date">Date</Link>
              </th>
            </tr>
          </thead>
          <tbody>
              {sortedNotes.map((note) => (
                <Card push={note.id} key={note.id} id={note.id} title={note.title} abstract={note.content.substring(0, 50) + "..."} date={note.date.toLocaleString()} />
              ))}
          </tbody>
        </table>
      </div>
      <Link href="/write" className='fixed rounded-full bottom-10 right-10 md:bottom-32 md:right-44 w-[60px] h-[60px] bg-black z-2 text-white hover:cursor-pointer flex justify-center items-center font-serif font-bold text-4xl leading-[60px] m-0'>+</Link>
    </>
  )
}