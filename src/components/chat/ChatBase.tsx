"use client"
import { getSocket } from '@/lib/socket.config'
import React, {Dispatch, SetStateAction, useEffect, useMemo, useState} from 'react'
import {v4 as uuidV4} from "uuid"
import { Button } from '../ui/button'
import ChatSidebar from './ChatSidebar'
import ChatNav from './ChatNav'
import ChatUserDialog from './ChatUserDialog'
import Chats from './Chats'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'

export default function ChatBase({name, group, users, oldMessages}:{name:string, group:ChatGroupType ; users: Array<GroupChatUserType>|[];
  oldMessages: Array<MessageType> | []}) {
  



    const [open, setOpen] = useState(true);
    const [chatUser, setChatUser] = useState<GroupChatUserType>();

    useEffect(()=>{
      const data = localStorage.getItem(group.id);
      if(data){
        const pData = JSON.parse(data);
        setChatUser(pData)
      }
    },[group.id, oldMessages])

    return (
    <div className='flex p-4 smallPadding'>
      <ChatSidebar users={users}/>

      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">

      {open? <ChatUserDialog name={name!} open={open} setOpen={setOpen} group={group}/> : <ChatNav chatGroup={group} users={users} />}
      
      <Chats users={users} group={group} chatUser={chatUser} oldMessages={oldMessages}/>

      </div>

    </div>

  )
}

