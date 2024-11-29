import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import GroupChatCardMenu from "./GroupChatCardMenu";
import Link from "next/link";
import Env from "@/lib/env";

export default function GroupChatCard({
  group,
  user,
}: {
  group: ChatGroupType;
  user: CustomUser;
}) {
  return (
    <Card className="shdw shdw:hover">
      <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/chat/${group.id}`}>
      <CardHeader className="flex-row justify-between items-center ">
        <CardTitle className="text-2xl">{group.title}</CardTitle>
        <GroupChatCardMenu user={user} group={group} />
      </CardHeader>
      <CardContent>
        <p>
          Passcode :-<strong>{group.passcode}</strong>
        </p>
        <p>Created At :-{new Date(group.created_at).toDateString()}</p>
      </CardContent>
      </Link>
      
    </Card>
  );
}