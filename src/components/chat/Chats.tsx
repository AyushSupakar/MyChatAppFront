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
    <div className="flex flex-col h-[80vh] smallchatH verysmallpad px-4">
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
      <form onSubmit={handleSubmit} className="mt-2 text-xl smallchat flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 verysmallpad p-4 border-8 smallborder text-xl smallchat rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className="smallbutt w-20 h-16 verysmallmargin verysmallpad mx-2 px-4">
        <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </Button>
      </form>
    </div>
  );
}