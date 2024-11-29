"use client"
import React, { Suspense, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import dynamic from 'next/dynamic'
import Link from 'next/link'
const LogoutModal = dynamic(()=>import("../auth/LogoutModal"))
export default function ProfileMenu({name, image, email}:{name:string, image?:string, email?:string}) {
    
    const[logoutOpen, setLogoutOpen] = useState(false);

  return (
    <div className='mt-4 size-16'>
        {logoutOpen && <Suspense fallback={<p>Loading...</p>}>
        <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />
        </Suspense>}
      <DropdownMenu>
  <DropdownMenuTrigger>
    <UserAvatar name={name} image={image}/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href="/profile">Profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setLogoutOpen(true)}>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </div>
  )
}
