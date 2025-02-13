import TextArea from '../../../components/textArea.jsx';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import DateConverter from './dateConverter.jsx';

async function NotePage({ params }) {
  const { id } = await params;
  const prisma = new PrismaClient();

  const note = await prisma.note.findUnique({
    where: { id: Number(id) },
  });

  async function editNote(formData) {
    'use server'
    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    }
    const prisma = new PrismaClient();

    await prisma.note.update({
      where: { id: Number(id) } ,
      data: {
        title: rawFormData.title,
        content: rawFormData.content,
        date: new Date,
      },
    }).then(() => {revalidatePath(`/note/${id}`);})
  }

  return (
    <form action={editNote}>
      <div className='flex flex-row'>
        <TextArea name="title" placeholder='Title...' maxLength={160} rows='1' className='text-5xl text-black font-medium mb-6 resize-none w-full outline-none p-2 rounded-xl over' value={note.title} />
        <button className='bg-neutral-800 shadow text-white font-medium p-2 pr-4 pl-4 rounded-xl h-fit' type='submit'>Save</button>
      </div>
      <DateConverter date={note.date} />
      <TextArea name="content" placeholder='Start writing...' className='text-2xl text-gray-900 resize-none w-full outline-none p-2 rounded-xl' value={note.content} />
    </form>
  )
}

export const dynamic = 'force-dynamic'

export default NotePage