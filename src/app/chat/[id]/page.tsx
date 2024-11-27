
import { authOption, CustomSession } from '@/app/api/auth/[...nextauth]/options';
import ChatBase from '@/components/chat/ChatBase'
import { chatsFetch } from '@/fetch/chatsFetch';
import { fetchChatUsers, fetchOneChatGroup } from '@/fetch/groupFetch';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React, { useState } from 'react'

export default async function chat({params}:{params:{id:string}}) {
    const {id} = await params;
    const session:CustomSession|null= await getServerSession(authOption);
    if(params.id.length!= 36){
      return notFound();
    }
  
    // console.log("The group id is", id)
  const group:ChatGroupType | null = await fetchOneChatGroup(params.id)

  if(group==null){
    return notFound();
  }

 const users:Array<GroupChatUserType> | [] = await fetchChatUsers(params.id);

 

  const chats: Array<MessageType> | [] = await chatsFetch(params.id);

    return (
    
    <div>
        <ChatBase name={session?.user?.name!} users={users} group={group} oldMessages={chats}/>
    </div>
  )
}
