"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createChatSchema, createChatSchemaType } from '@/validations/groupChatValidations'
import { Input } from "@/components/ui/input"
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { CHAT_GROUP_URL } from '@/lib/apiEndPoints'
import { headers } from 'next/headers'
import { clearCache } from '@/actions/common'


  
export default function CreateChat({user}:{user:CustomUser}) {
    const [open, setOpen] = useState(false);
    const [loading, setloading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<createChatSchemaType>({
        resolver: zodResolver(createChatSchema),
      })

      const onsubmit= async (payload:createChatSchemaType)=>{
             try {
              setloading(true);
              const {data} = await axios.post(CHAT_GROUP_URL, {...payload, user_id:user.id}, {
                headers:{
                  Authorization:user.token
                }
              } );
              if(data?.message){
                clearCache("dashboard");
                setloading(false);
                setOpen(false);
                toast.success(data?.message);
              }
            } catch (error) {
              setloading(false);
              if(error instanceof AxiosError){
                toast.error(error.message)
              }
              else{
                toast.error("something went wrong, please try again!");
              }
            }
      }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button className='shdw' >
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" enableBackground="new 0 0 32 32" xmlSpace="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="22,16.8 22,26 6,26 6,10 15.2,10 17.2,8 4,8 4,28 24,28 24,14.8 "></polygon> <path fill="none" stroke="#ffffff" strokeWidth="2" strokeMiterlimit="10" d="M16.5,18.3L13,19l0.7-3.5l9.9-9.9 c0.8-0.8,2-0.8,2.8,0l0,0c0.8,0.8,0.8,2,0,2.8L16.5,18.3z"></path> </g></svg>
      Create Group</Button>
  </DialogTrigger>
  <DialogContent onInteractOutside={(e)=>e.preventDefault()}>
    <DialogHeader>
      <DialogTitle>Create Your New Chat</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit(onsubmit)}>
        <div className='mt-4'>
            <Input placeholder='Enter chat title' {...register("title")}/>
            <span className='text-red-500'>{errors?.title?.message}</span>
        </div>

        <div className='mt-4'>
            <Input placeholder='Enter PassCode' {...register("passcode")}/>
            <span className='text-red-500'>{errors?.passcode?.message}</span>
        </div>

        <div className='mt-4'>
            <Button className='w-full' disabled={loading}>{loading?"Processing...":"Submit"}</Button>
        </div>



    </form>
  </DialogContent>
</Dialog>

  )
}
