'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { MdLogout } from 'react-icons/md'
import { usePathname } from 'next/navigation'

const SignOutButton = ({styles}) => {
  const path = usePathname();
  const router = useRouter();

  return (
    <form className={`${path  === '/' ? 'block' : 'hidden'}`} action={async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    }}>
      <button className={styles}>
        <div className='flex flex-row items-center justify-center'><MdLogout className='text-xl mr-1' />Sign out</div>
      </button>
    </form>
  )
}

export default SignOutButton