import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

export default async function chat({params}:{params:{id:string}}) {
    const {id} = await params;
  console.log("The group id is", id)
    return (
    
    <div>
        <h1>Hello I am chat</h1>
        <ChatBase groupId={params.id}/>
    </div>
  )
}
