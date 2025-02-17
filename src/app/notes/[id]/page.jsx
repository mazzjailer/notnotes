import TextArea from '../../../components/textArea.jsx';
import { revalidatePath } from 'next/cache';
import { PrismaClient } from '@prisma/client';
import DateConverter from './dateConverter.jsx';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NotFound from '../../not-found.jsx'

async function NotePage({ params }) {
  const { id } = await params;
  const prisma = new PrismaClient();
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    redirect('/sign-in');
  }

  const note = await prisma.note.findUnique({
    where: {
      id: Number(id),
      userId: session.user.id,
    },
    include: {
      user: true,
    }
  }) || null;

  async function editNote(formData) {
    'use server'
    const session = await auth.api.getSession({
      headers: await headers(),
    })
    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    }
    const prisma = new PrismaClient();

    await prisma.note.update({
      where: {
        id: Number(id),
        userId: session.user.id,
      } ,
      data: {
        title: rawFormData.title,
        content: rawFormData.content,
        date: new Date,
      },
    }).then(() => {revalidatePath(`/note/${id}`);})
  }

  return (
    <>
      {note === null ? <NotFound /> : 
      <form action={editNote}>
        <div className='flex flex-row'>
          <TextArea name="title" placeholder='Title...' maxLength={160} rows='1' className='text-5xl text-black dark:text-white dark:bg-black font-medium mb-6 resize-none w-full outline-none p-2 rounded-xl over' value={note.title} />
          <button className='bg-neutral-800 dark:bg-neutral-100 shadow text-white dark:text-black font-medium p-2 pr-4 pl-4 rounded-xl h-fit' type='submit'>Save</button>
        </div>
        <div className='flex flex-row'>
          <DateConverter date={note.date} />
          <p className='text-neutral-500 dark:text-neutral-400 text-md'>by {note.user.name}</p>
        </div>
        <TextArea name="content" placeholder='Start writing...' className='text-2xl text-neutral-900 resize-none w-full outline-none p-2 rounded-xl dark:text-white dark:bg-black' value={note.content} />
      </form>
      }
    </>
  )
}

export const dynamic = 'force-dynamic'

export default NotePage