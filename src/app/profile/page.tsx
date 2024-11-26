import DashNav from '@/components/dashboard/DashNav'
import React from 'react'

import { getServerSession } from 'next-auth'
import { json } from 'stream/consumers';
import { Session } from 'inspector/promises';
import CreateChat from '@/components/groupchat/CreateChat';
import { fetchChatGroup } from '@/fetch/groupFetch';
import GroupChatCard from '@/components/groupchat/GroupChatCard';
import { authOption, CustomSession } from '@/app/api/auth/[...nextauth]/options';
import { Container } from 'postcss';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function profile() {
    const session:CustomSession|null= await getServerSession(authOption);
    
  return (
    <div className='h-screen flex  justify-center items-center'>
      <div className="flex flex-col justify-center items-center">
      <div className="border-8 cborder-blue-900 rounded-full p-2 shadow-xl "><img src={session?.user?.image!} alt="" width={1000} height={1000} className="rounded-full w-36 h-36"/></div>
      <div className="flex flex-col my-8 justify-center items-center"> 
        <div className="m-4 p-2 px-4 font-bold text-black text-lg rounded-e-lg shadow-xl rlink cursor-pointer">Name : {session?.user?.name}</div>
        <div className="m-4 p-2 px-4 font-bold text-black text-lg rounded-e-lg shadow-xl rlink cursor-pointer">E-Mail : {session?.user?.email}</div>
        
        <div className="flex w-full mt-8 justify-center">
          <div className="flex"><Link href="/dashboard"><Button>
            Back to DashBoard
          </Button>
          </Link></div>
          </div>
          
          
        
        </div>
       
    </div>
    </div>
      

  )
}
