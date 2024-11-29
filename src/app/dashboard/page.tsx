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
import Image from 'next/image';

export default async function dashboard() {
    const session:CustomSession|null= await getServerSession(authOption);
    const groups:Array<ChatGroupType>|[] = await fetchChatGroup(session?.user?.token!);
    // console.log("The groups are :",groups);
  return (
    <div className='p-8'>
      {/* <p>{JSON.stringify(session)}</p> */}
      <DashNav name={session?.user?.name!} image ={session?.user?.image?? undefined} email={session?.user?.name!}/>

      <div className="flex justify-between p-4 mx-8">
          <div className="flex justify-start mt-8">
          <CreateChat user={session?.user!}/>
        </div>

        <div className="flex justify-end mt-10">
          <Link href="/">
          <Button className='shdw'>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z" fill="#ffffff"></path> </g></svg>
            Back to Home</Button>
          </Link>
        </div>
      
      </div>

      <div className={(groups.length > 0)?("grid grid-cols-1 m-4 md:grid-cols-2 lg:grid-cols-3 gap-8"):("flex justify-center m-4")}>
          {(groups.length > 0)?
            (groups.map((item, index) => (
              <GroupChatCard group={item} key={index} user={session?.user!} />
            ))):(<div className="flex-col text-center p-2">

              <h1 className=" text-2xl font-bold font-sans p-2">Welcome to MyChatApp, Please create a Group and share the Link with friends to chat with them. </h1>

              <div className="flex justify-center"><div className="w-1/2">
                
              <img src="/MyChatAppW.png" alt="Illustration" className=""/>
            </div></div>
            </div>

              

              
          )}
        </div>

    </div>
  )
}
