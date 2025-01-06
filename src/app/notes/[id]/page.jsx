import TextArea from '../../components/textArea.jsx';
import Header from '../../components/header.jsx'
import { revalidatePath } from 'next/cache';

async function NotePage({ params }) {
  const { id } = await params;

  const data = await fetch(`${process.env.NEXTAPP_URL}/api/notes/${id}`, {
    method: 'GET',
  });
  const note = await data.json();

  async function editNote(formData) {
    'use server'
    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    }

    const updatedNote = await fetch(`${process.env.NEXTAPP_URL}/api/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rawFormData),
    }).then(() => {revalidatePath(`/note/${id}`);})
  }

  return (
    <>
      <Header notePage={true} id={id} />
      <div className='p-6 pt-6 md:pt-8 md:pr-36 md:pl-36 '>
        <form action={editNote}>
          <div className='flex flex-row'>
            <TextArea name="title" placeholder='Title...' maxLength={160} rows='1' className='text-5xl text-black font-medium mb-6 resize-none w-full outline-none p-2 rounded-xl over' value={note.title} />
            <button className='bg-black text-white font-medium p-2 pr-4 pl-4 rounded-xl h-fit' type='submit'>Save</button>
          </div>
          <p className='p-2 pt-0 text-gray-500'>Last updated: {new Date (note.date).toLocaleString("en-GB")}</p>
          <TextArea name="content" placeholder='Start writing...' className='text-2xl text-gray-900 resize-none w-full outline-none p-2 rounded-xl' value={note.content} />
        </form>
      </div>
    </>
  )
}

export default NotePage