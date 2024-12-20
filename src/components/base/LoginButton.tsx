"use client"
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import React from 'react'
import LogInModal from '../auth/LoginModal'
import Link from 'next/link'
import { Button } from '../ui/button'
import ProfileMenu from '../auth/ProfileMenu'

export default function LoginButton({ 
    user
 }: { 
    user?: CustomUser | null
 }) {
  return (
    <div className='m-2 hiddenOnSmall'>
      {!user ? (
          <LogInModal word={"Login"} />
        ) : (

          <ProfileMenu name={user?.name!} image={user?.image!} email={user?.email!} />
        )}
    </div>
  )
}
