"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import Link from "next/link";
import Env from "@/lib/env";
import { Button } from "../ui/button";
import { toast } from "sonner";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {

  const handleCopy = () => {
    navigator.clipboard?.writeText(`${Env.APP_URL}/chat/${group.id}`);
    toast.success("Link copied successfully!");
  };

  return (
    <Card className="Nshdw">
      
      <CardHeader className="flex-row justify-between items-center ">
        <CardTitle className="text-2xl">{(group.title.length<=17)?(group.title):(group.title.substring(0,16).concat("..."))}</CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent>
        <p>
          Passcode :-<strong>{group.passcode}</strong>
        </p>
        <p>Created At :-{new Date(group.created_at).toDateString()}</p>
      </CardContent>
      

      <div className="flex justify-between px-4 smallPadding">
            <div className="flex m-4 smallMargin">
           
              <Button onClick={handleCopy} className="shdw px-4 smallPadding">Copy Link 
                <svg className="size-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.16488 17.6505C8.92513 17.8743 8.73958 18.0241 8.54996 18.1336C7.62175 18.6695 6.47816 18.6695 5.54996 18.1336C5.20791 17.9361 4.87912 17.6073 4.22153 16.9498C3.56394 16.2922 3.23514 15.9634 3.03767 15.6213C2.50177 14.6931 2.50177 13.5495 3.03767 12.6213C3.23514 12.2793 3.56394 11.9505 4.22153 11.2929L7.04996 8.46448C7.70755 7.80689 8.03634 7.47809 8.37838 7.28062C9.30659 6.74472 10.4502 6.74472 11.3784 7.28061C11.7204 7.47809 12.0492 7.80689 12.7068 8.46448C13.3644 9.12207 13.6932 9.45086 13.8907 9.7929C14.4266 10.7211 14.4266 11.8647 13.8907 12.7929C13.7812 12.9825 13.6314 13.1681 13.4075 13.4078M10.5919 10.5922C10.368 10.8319 10.2182 11.0175 10.1087 11.2071C9.57284 12.1353 9.57284 13.2789 10.1087 14.2071C10.3062 14.5492 10.635 14.878 11.2926 15.5355C11.9502 16.1931 12.279 16.5219 12.621 16.7194C13.5492 17.2553 14.6928 17.2553 15.621 16.7194C15.9631 16.5219 16.2919 16.1931 16.9495 15.5355L19.7779 12.7071C20.4355 12.0495 20.7643 11.7207 20.9617 11.3787C21.4976 10.4505 21.4976 9.30689 20.9617 8.37869C20.7643 8.03665 20.4355 7.70785 19.7779 7.05026C19.1203 6.39267 18.7915 6.06388 18.4495 5.8664C17.5212 5.3305 16.3777 5.3305 15.4495 5.8664C15.2598 5.97588 15.0743 6.12571 14.8345 6.34955" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></path> </g></svg>
                </Button>
              
            </div>

            <div className="flex m-4 smallMargin">
            <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/chat/${group.id}`}>
              <Button className="shdw px-4 smallPadding">Open Chat 
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_105_1855)"> <path d="M9 4.00024H19V18.0002C19 19.1048 18.1046 20.0002 17 20.0002H9" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path> <path d="M12 15.0002L15 12.0002M15 12.0002L12 9.00024M15 12.0002H5" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path> </g> <defs> <clipPath id="clip0_105_1855"> <rect fill="white" height="24" transform="translate(0 0.000244141)" width="24"></rect> </clipPath> </defs> </g></svg>

              </Button>
              </Link>
            </div>
      </div>
    </Card>
  );
}