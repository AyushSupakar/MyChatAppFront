import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ChatNav({
  chatGroup,
  users,
  user,
}: {
  chatGroup: ChatGroupType;
  users: Array<GroupChatUserType> | [];
  user?: GroupChatUserType;
}) {
  return (
    <nav className="w-full  justify-between items-center  px-6 py-2 border-b">
      <div className=" space-x-4 md:space-x-0 items-center">
        <div className="md:hidden">
          <MobileChatSidebar users={users} />
        </div>
        <div className="flex justify-between">

            <div className="flex">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          {chatGroup.title}
        </h1>
        </div>


          <div className=" px-4">
            <Link href="/dashboard">
            <Button className="text-md font-bold">Back to DashBoard</Button>
            </Link>
        </div>
          


        </div>
        



        
        {/* <p>{new Date(chatGroup.created_at).toDateString()}</p> */}

        
      </div>
      <p>{user?.name}</p>
    </nav>
  );
}