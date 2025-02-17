import SignIn from '@/app/(auth)/sign-in/page'
import React from 'react'
import Footer from '@/components/footer'

const InitialHomePage = () => {
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-4'>
        <div className='col-span-1 lg:col-span-1 xl:col-span-2 flex flex-col gap-2'>
          <h1 className='text-4xl font-bold border-b'>Welcome to notNotes! 📔</h1>
          <h2 className='text-md'>A simple note-taking app. Made with Next.js, React, TailwindCSS, Shadcn UI, Better-Auth, MySQL and Prisma ORM.</h2>
        </div>
        <SignIn />
      </div>
      <Footer />
    </>
  )
}

export default InitialHomePage