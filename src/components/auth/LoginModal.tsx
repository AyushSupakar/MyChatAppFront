import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import Image from 'next/image'
import { signIn } from 'next-auth/react'


function LogInModal({word}:{word:string}) {

  const handleLogin = () =>{

    signIn("google",{
      callbackUrl:"/dashboard",
      redirect:true
    })

  }

  return (
    <div>
      <Dialog>
  <DialogTrigger asChild>
    <Button>
      {word}
    </Button>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='flex justify-center '> <div className='text-2xl'>Welcome to MyChat App</div> </DialogTitle>
      <DialogDescription className='flex justify-center'>
        Make secure conversations with anyone with MyChatt App!
      </DialogDescription>
    </DialogHeader>
    <Button variant={'outline'} onClick={handleLogin}>

      <img 
      src="/images/google.svg"
      className='mr-4'
      width={20}
      height={20}
      alt="google logo"
      />
        Continue with Google
    </Button>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default LogInModal
