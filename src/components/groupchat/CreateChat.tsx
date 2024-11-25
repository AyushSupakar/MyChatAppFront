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
    <Button>Create Group</Button>
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
