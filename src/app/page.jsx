import Card from './card'
import Link from 'next/link'
import './globals.css'
import { sort } from 'fast-sort'
import Search from './components/search.jsx'
import { FaPen } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default async function App( {searchParams} ) {
  const { sortOrder = '' } = await searchParams;
  const { search = '' } = await searchParams;
  
  const data = await fetch(`${process.env.NEXTAPP_URL}/api/notes`, {
    method: 'GET',
  });
  let notes = await data.json();

  if (search) {
    notes = notes.filter(note => note.title.toLowerCase().includes(search.toLowerCase()) || note.content.toLowerCase().includes(search.toLowerCase()));
  }
  if (sortOrder === 'title') {
    const snotes = sort(notes).desc(note => note.title);
    notes = snotes;
  } else {
    const snotes = sort(notes).desc(note => note.date);
    notes = snotes;
  }

  return (
    <>
      <div className='flex flex-col p-6 pt-16 md:p-36 md:pt-20'>
        <Link href='/' className='text-5xl text-black font-bold mb-6'>notNotes</Link>
        <div className='flex flex-row items-center justify-center'>
          { search && <Link href='/' className='text-black text-xl font-bold mb-7 mr-4 flex flex-nowrap justify-center items-center' ><IoIosArrowBack className='text-2xl' />Back</Link>}
          <Search />
        </div>
        <table className='w-full'>
          <thead className='text-left text-gray-600 text-lg'>
            <tr>
              <th>
                <Link className='p-5' href={"/?search=" + search + "&sortOrder=title"}>Title</Link>
              </th>
              <th>
                <Link className='p-5' href={"/?search=" + search + "&sortOrder=date"}>Date</Link>
              </th>
            </tr>
          </thead>
          <tbody>
              {notes.map((note) => (
                <Card push={note.id} key={note.id} id={note.id} title={note.title} abstract={note.content.substring(0, 50) + "..."} date={new Date (note.date).toLocaleString("en-GB")} />
              ))}
          </tbody>
        </table>
      </div>
      <Link href="/write" className='fixed rounded-2xl bottom-10 right-10 md:bottom-32 md:right-44 w-[60px] h-[60px] bg-black z-2 text-white hover:cursor-pointer flex justify-center items-center text-xl'><FaPen /></Link>
    </>
  )
}