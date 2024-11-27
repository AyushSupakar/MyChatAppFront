import React, {useEffect, useMemo, useRef, useState } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
export default function Chats({
  users,
  group,
  oldMessages,
  chatUser,
}: {
  users: Array<GroupChatUserType>|[];
  group: ChatGroupType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) { 
  const [newU, setNewU] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const reloadPage = ()=>{ 
    console.log("Inside reload function ");

    window.location.reload(); 
}

const updateU =()=>{
  console.log("Inside UpdateU, current newU(FALSE)=", newU);
  setNewU(newU => true);
  console.log("Inside UpdateU, current newU(true)=", newU);
}

  let socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: group.id,
    };
    return socket.connect();
  }, []);
  
  const checkNew=(data:MessageType)=>{
    if(data?.name){
      console.log("It has a name =", data?.name);
      console.log("newU is (should be false) =", newU);
      updateU();
      console.log("newU is (should be true) =", newU);
      for(var i=0;i<users.length;i++){
        console.log("inside loop");
        if((users[i].name)==(data.name)){
          console.log("Matched! at user =", users[i]);
          setNewU(false);
          console.log("newU is (should be true) =", newU);
        }
      }
      if(newU){
        console.log("newU is Still True, because its new user = newU(true) = ", newU);
        console.log("Going to reload page");
        reloadPage();
        console.log("Reloaded ");
        setNewU(false);
        console.log("newU is set to false now -1 = ", newU);
      }

      setNewU(false);
      console.log("newU is set to false now -2 = ", newU);

    }
  
  }
 
  const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? "Unknown",
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
  useEffect(() => {
    
  

    socket.on("message", (data: MessageType) => {
      console.log("The message is", data);
      checkNew(data);
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom();
    });

    return () => {
      socket.close();
    };
  }, []);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    
    socket.emit("message", payload);
    setMessage("");
    setMessages([...messages, payload]);
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2 text-lg">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lgm-2 ${
                message.name === chatUser?.name
                  ? " self-end text-end"
                  : " self-start text-start"
              }`}
            >
              <div className="px-2 font-bold font-sans  ">{message.name} :</div>
              <div className={`max-w-sm rounded-lg p-2 ${
                message.name === chatUser?.name
                  ? "bg-gradient-to-r from-blue-500 to-blue-700  text-white self-end text-start"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start"
              }`}>{message.message}</div>
  
            </div>



          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 text-xl flex items-center mb-8">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-4 border-8 text-xl rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className=" mx-2 px-4">
          <img src="/images/send2.svg" alt="" height={50} width={50} />
        </button>
      </form>
    </div>
  );
}