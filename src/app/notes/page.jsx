import Card from '../noteCard'
import Link from 'next/link'
import { sort } from 'fast-sort'
import { FaPen } from "react-icons/fa";
import { PrismaClient } from '@prisma/client'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

export default async function App( {searchParams} ) {
  const { sortOrder = '' } = await searchParams;
  const { search = '' } = await searchParams;
  const prisma = new PrismaClient();
  const MONTHS = [
    { month: 0, name: 'January' },
    { month: 1, name: 'February' },
    { month: 2, name: 'March' },
    { month: 3, name: 'April' },
    { month: 4, name: 'May' },
    { month: 5, name: 'June' },
    { month: 6, name: 'July' },
    { month: 7, name: 'August' },
    { month: 8, name: 'September' },
    { month: 9, name: 'October' },
    { month: 10, name: 'November' },
    { month: 11, name: 'December' }
  ];
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
        <Table className="border-separate border-spacing-y-2">
          <TableBody className='*:border-0 space-y-2'>
            {MONTHS.reverse().map(({ month, name }) => {
              const monthNotes = notes.filter(note => note.date.getMonth() === month && note.date.getFullYear() === new Date().getFullYear());
              if (monthNotes.length === 0) return null;

              return (
                <React.Fragment key={month}>
                  <tr>
                    <td className='p-2 pl-0'>
                      <h2 className='text-2xl'>{name}</h2>
                    </td>
                  </tr>
                  {monthNotes.map((note) => (
                    <Card
                      push={note.id}
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      abstract={note.content.substring(0, 50) + "..."}
                      date={note.date}
                    />
                  ))}
                </React.Fragment>
              );
            })}
            {Object.entries(
            notes.filter(note => note.date.getFullYear() < new Date().getFullYear()).reduce((acc, note) => {
              const year = note.date.getFullYear();
              if (!acc[year]) acc[year] = [];
              acc[year].push(note);
              return acc;
            }, {})
            ).sort((a, b) => b[0] - a[0]).map(([year, yearNotes]) => (
              <React.Fragment key={year}>
                <tr>
                  <td className='p-2 pl-0'>
                    <h2 className='text-2xl'>{year}</h2>
                  </td>
                </tr>
                {yearNotes.map((note) => (
                  <Card
                    push={note.id}
                    key={note.id}
                    id={note.id}
                    title={note.title}
                    abstract={note.content.substring(0, 20) + "..."}
                    date={note.date}
                  />
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      <Link href="/write" className='fixed rounded-2xl bottom-10 right-10 md:bottom-32 md:right-44 w-[60px] h-[60px] bg-black dark:bg-white z-2 text-white dark:text-black hover:cursor-pointer flex justify-center items-center text-xl'><FaPen /></Link>
    </div>
  )
}