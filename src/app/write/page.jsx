import React from 'react'
import TextArea from '../components/textArea.jsx'
import Header from '../components/header.jsx'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

async function page() {
  async function addNote(formData) {
    'use server'

    const prisma = new PrismaClient();
    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    }

    const newNote = await prisma.note.create({
      data: {
        title: rawFormData.title,
        content: rawFormData.content,
      },
    })

    redirect(`/notes/${newNote.id}`)
    
  }
  const handleClick = () => {
    alert('clicked');

  }

  return (
    <>
      <Header />
      <div className='p-6 md:pr-36 md:pl-36 '>
        <form action={addNote}>
          <div className='flex flex-row'>
            <TextArea name="title" placeholder='Title...' maxLength={160} rows='1' className='text-5xl text-black font-bold mb-6 resize-none w-full outline-none p-2 rounded-xl over' />
            <button className='bg-black text-white font-semibold p-2 pr-4 pl-4 rounded-xl h-fit' type='submit'>Save</button>
          </div>
          <TextArea name="content" placeholder='Start writing...' className='text-2xl text-gray-900 resize-none w-full outline-none p-2 rounded-xl' />
        </form>
      </div>
    </>
  )
}

export default page