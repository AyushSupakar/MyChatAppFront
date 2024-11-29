"use client"
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import React from 'react'
import LogInModal from '../auth/LoginModal'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function LetsChat({ 
    user
 }: { 
    user?: CustomUser | null
 }) {
  return (
    <div className='mt-2'>
      {!user ? (
          <LogInModal word={"Login to Chat"} />
        ) : (
          <Link href="/dashboard">
            <Button>Let's Chat!</Button>
          </Link>
        )}
    </div>
  )
}