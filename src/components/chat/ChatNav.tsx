import React from "react";
import MobileChatSidebar from "./MobileChatSidebar";
import Link from "next/link";
import { Button } from "../ui/button";
import ProfileMenu from "../auth/ProfileMenu";

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
    <nav className="w-full justify-between items-center smallPadding  px-6 py-2 border-b">
      <div className=" items-center">
        <div className="w-20 md:hidden m-2 p-2">
                      <MobileChatSidebar users={users} />

                    

                    </div>
        <div className="flex justify-between items-center">
            
            <div className="flex rtoghid">
          <h1 className="text-4xl smallHeading font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          {chatGroup.title}
        </h1>
        </div>

        <div className="hidden toghid">
          <h1 className="text-4xl smallHeading font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          {(chatGroup.title.length<10)?(chatGroup.title):(chatGroup.title.substring(0,10).concat("..."))}
        </h1>
        </div>


          <div className=" px-4 smallPadding">
            <Link href="/dashboard">
            <Button className="text-md font-bold">
            
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              DashBoard</Button>
            </Link>
        </div>
          


        </div>
        



        
        {/* <p>{new Date(chatGroup.created_at).toDateString()}</p> */}

        
      </div>
      <p>{user?.name}</p>
    </nav>
  );
}