import DashNav from '@/components/dashboard/DashNav'
import React from 'react'
import { authOption, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { json } from 'stream/consumers';
import { Session } from 'inspector/promises';
import CreateChat from '@/components/groupchat/CreateChat';
import { fetchChatGroup } from '@/fetch/groupFetch';
import GroupChatCard from '@/components/groupchat/GroupChatCard';

export default async function dashboard() {
    const session:CustomSession|null= await getServerSession(authOption);
    const groups:Array<ChatGroupType>|[] = await fetchChatGroup(session?.user?.token!);
    console.log("The groups are :",groups);
  return (
    <div>
      {/* <p>{JSON.stringify(session)}</p> */}
      <DashNav name={session?.user?.name!} image ={session?.user?.image?? undefined}/>

      <div className="container">
          <div className="flex justify-end mt-10">
          <CreateChat user={session?.user!}/>
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
