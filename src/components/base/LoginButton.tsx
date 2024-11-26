"use client"
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import React from 'react'
import LogInModal from '../auth/LoginModal'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function LoginButton({ 
    user
 }: { 
    user?: CustomUser | null
 }) {
  return (
    <div className='mt-2'>
      {!user ? (
          <LogInModal />
        ) : (
          <Link href="/dashboard">
            <Button>Let's Chat!</Button>
          </Link>
        )}
    </div>
  )
}
