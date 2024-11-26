import DashNav from '@/components/dashboard/DashNav'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { json } from 'stream/consumers';
import { Session } from 'inspector/promises';
import CreateChat from '@/components/groupchat/CreateChat';
import { fetchChatGroup } from '@/fetch/groupFetch';
import GroupChatCard from '@/components/groupchat/GroupChatCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function dashboard() {
    const session:CustomSession|null= await getServerSession(authOption);
    const groups:Array<ChatGroupType>|[] = await fetchChatGroup(session?.user?.token!);
    console.log("The groups are :",groups);
  return (
    <div className='p-8'>
      {/* <p>{JSON.stringify(session)}</p> */}
      <DashNav name={session?.user?.name!} image ={session?.user?.image?? undefined} email={session?.user?.name!}/>

      <div className="flex justify-between p-4 mx-8">
          <div className="flex justify-start mt-10">
          <CreateChat user={session?.user!}/>
        </div>

        <div className="flex justify-end mt-10">
          <Link href="/">
          <Button>Back to Home</Button>
          </Link>
        </div>
      
      </div>

      <div className="grid grid-cols-1 m-4 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.length > 0 &&
            groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))}
        </div>

    </div>
  )
}
