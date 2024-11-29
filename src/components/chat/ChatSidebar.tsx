import React from "react";

export default function ChatSidebar({
  users,
}: {
  users: Array<GroupChatUserType> | [];
}) {
  return (
    <div className="hidden md:block h-[84vh] text-center overflow-y-scroll w-1/5 bg-muted px-2">
      <h1 className="text-2xl font-sans verysmallpad px-4 font-extrabold py-4 smallhead2 ">Group Members</h1>
      {users.length > 0 &&
        users.map((item, index) => (
          <div key={index} className="bg-white rounded-md verysmallpad p-2 px-4 mt-2">
            <p className="font-bold"> {item.name}</p>
            <p>
              Joined : <span>{new Date(item.created_at).toDateString()}</span>
            </p>
          </div>
        ))}
    </div>
  );
}