"use client";
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { CHAT_GROUP_USERS_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import { v4 as uuidv4 } from "uuid";
import { getSocket } from "@/lib/socket.config";
import { fetchChatUsers } from "@/fetch/groupFetch";

export default function ChatUserDialog({
  name,
  open,
  setOpen,
  group,
}: {
  name:string,
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  group: ChatGroupType;
}) {
  const params = useParams();
  const [state, setState] = useState({
    name: "",
    passcode: "",
  });

  //---



//---
  useEffect(() => {
    const data = localStorage.getItem(params["id"] as string);
    if (data) {
      const jsonData = JSON.parse(data);
      if (jsonData?.name && jsonData?.group_id) {
        setOpen(false);
      }
    }
    setState({...state, name:(name)?(name.split(" ")[0]):("new user")});

  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const localData = localStorage.getItem(params["id"] as string);
    if (!localData) {
      try {
        const { data } = await axios.post(CHAT_GROUP_USERS_URL, {
          name: state.name,
          group_id: params["id"] as string,
        });
        localStorage.setItem(
          params["id"] as string,
          JSON.stringify(data?.data)
        );
      } catch (error) {
        toast.error("Something went wrong.please try again!");
      }
    }
    if (group.passcode != state.passcode) {
      toast.error("Please enter correct passcode!");
    } else {
      setOpen(false);
    }
  };

  const reloadPage = ()=>{ 

    window.location.reload(); 
}



  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the Passcode</DialogTitle>
          <DialogDescription>
            {`Hi ${(name)?(name?.split(" ")[0]):("new user")}, Please provide the pas code to enter the chat room.`}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>

          {(name)?(
            <div className="mt-2">

            <></>
          </div>
          ):(
            <Input
              placeholder="Enter your Name"
              value={state.name}
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
          )}
          <div className="mt-2">

            <Input
              placeholder="Enter your passcode"
              value={state.passcode}
              onChange={(e) => setState({ ...state, passcode: e.target.value })}
            />
          </div>
          <div className="mt-2">
            <Button className="w-full" onClick={reloadPage}>Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}