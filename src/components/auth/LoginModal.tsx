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
function LogInModal() {
  return (
    <div>
      <Dialog>
  <DialogTrigger asChild>
    <Button>
      Getting Started
    </Button>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='text-2xl'>Welcome to MyChat App</DialogTitle>
      <DialogDescription>
        Make secure conversations with anyone with MyChatt App! 
      </DialogDescription>
    </DialogHeader>
    <Button variant={'outline'}>

      <Image 
      src="/images/gooogle.png"
      className='mr-4'
      width={25}
      height={25}
      alt="google logo"
      >
        Continue with Google
      </Image>

    </Button>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default LogInModal
