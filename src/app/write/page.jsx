'use client'
import React, { useState } from 'react'
import TextArea from '../../components/textArea.jsx'
import { useRouter } from 'next/navigation'
import { FiLoader } from "react-icons/fi"
import { useSession } from '@/contexts/sessionContext.jsx'

function page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session } = useSession();
  if (!session) {
    router.push('/sign-in');
  }

  async function addNote(formData) {
    setLoading(true);

    const rawFormData = {
      title: formData.get('title'),
      content: formData.get('content'),
    }

    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: rawFormData.title,
        content: rawFormData.content,
        userId: session.user.id,
      })
    })
    const note = await response.json();

    router.push(`/notes/${note.id}`);
  }

  return (
    <form action={addNote}>
      <div className='flex flex-row'>
        <TextArea name="title" placeholder='Title...' maxLength={160} rows='1' className='text-5xl text-black dark:text-white dark:bg-black font-medium mb-6 resize-none w-full outline-none p-2 rounded-xl over' />
        <button className='bg-neutral-800 dark:bg-neutral-100 shadow text-white dark:text-black font-medium p-2 pr-4 pl-4 rounded-xl h-fit' type='submit' disabled={loading}>{loading ? ( <FiLoader className="animate-spin" /> ) : ("Save") }</button>
      </div>
      <TextArea name="content" placeholder='Start writing...' className='text-2xl text-neutral-900 dark:text-white dark:bg-black  resize-none w-full outline-none p-2 rounded-xl' />
    </form>
  )
}

export default page