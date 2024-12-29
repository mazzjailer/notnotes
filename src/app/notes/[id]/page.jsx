import React from 'react'
import { PrismaClient } from '@prisma/client'
import TextArea from '../../components/textArea.jsx';
import Header from '../../components/header.jsx'
import { revalidatePath } from 'next/cache';

async function NotePage({ params }) {
  const { id } = await params
  const prisma = new PrismaClient();

  const notes = await prisma.note.findUnique({
    where: { id: Number(id) },
  });
  async function editNote(formData) {
    'use server'

    const prisma = new PrismaClient();
    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    }

    const updateNote = await prisma.note.update({
      where: {
        id: Number(id)

      },
      data: {
        title: rawFormData.title,
        content: rawFormData.content,
        date: new Date,
      },
    })

    revalidatePath(`/notes/${id}`);
  }

  return (
    <>
      <Header />
      <div className='p-6 pt-6 md:pt-0 md:pr-36 md:pl-36 '>
        <form action={editNote}>
          <div className='flex flex-row'>
            <TextArea name="title" placeholder='Title...' maxLength={160} rows='1' className='text-5xl text-black font-bold mb-6 resize-none w-full outline-none p-2 rounded-xl over' value={notes.title} />
            <button className='bg-black text-white font-semibold p-2 pr-4 pl-4 rounded-xl h-fit' type='submit'>Save</button>
          </div>
          <p className='p-2 pt-0 text-gray-500'>Last updated: {notes.date.toLocaleString('en-GB', { timeZone: 'UTC' })}</p>
          <TextArea name="content" placeholder='Start writing...' className='text-2xl text-gray-900 resize-none w-full outline-none p-2 rounded-xl' value={notes.content} />
        </form>
      </div>
    </>
  )
}

export default NotePage