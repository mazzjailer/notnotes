import Card from '../card'
import Link from 'next/link'
import { sort } from 'fast-sort'
import { FaPen } from "react-icons/fa";
import { PrismaClient } from '@prisma/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function App( {searchParams} ) {
  const { sortOrder = '' } = await searchParams;
  const { search = '' } = await searchParams;
  const prisma = new PrismaClient();
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/sign-in');
  }

  let notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
    }
  });

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
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center justify-center'>
        </div>
          <table className='w-full'>
            <thead className='text-left text-gray-600 text-lg'>
              <tr>
                <th>
                  <Link className='p-5' href={"/notes?search=" + search + "&sortOrder=title"}>Title</Link>
                </th>
                <th>
                  <Link className='p-5' href={"/notes?search=" + search + "&sortOrder=date"}>Date</Link>
                </th>
              </tr>
            </thead>
            <tbody>
                {notes.map((note) => (
                  <Card push={note.id} key={note.id} id={note.id} title={note.title} abstract={note.content.substring(0, 50) + "..."} date={note.date} />
                ))}
            </tbody>
          </table>
      </div>
      <Link href="/write" className='fixed rounded-2xl bottom-10 right-10 md:bottom-32 md:right-44 w-[60px] h-[60px] bg-black z-2 text-white hover:cursor-pointer flex justify-center items-center text-xl'><FaPen /></Link>
    </div>
  )
}