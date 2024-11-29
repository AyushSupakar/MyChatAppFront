import React from 'react'
import ProfileMenu from '../auth/ProfileMenu'

export default function DashNav({name, image, email}:{name:string, image?:string, email?:string}) {
  return (
    <nav className="smallPadding px-6 flex justify-between items-center bg-white shadow-sm">
      <div className="flex gap-6 items-center"> <img
        src="/icon.ico"
        width={100}
        height={100}
        alt=""
        />

      

      {/*  */}
      </div>

    <div className="flex flex-col text-center gap-1 hiddenOnSmall">

        <h1 className="text-4xl md:text-4xl font-extrabold">Dashboard</h1>
        <h3 className="text-lg text-gray-600">Create a Group, Share the Link, Share the Passcode and have a private Chat Room with your friends!</h3>

      </div>


      <div className="flex items-center space-x-2 md:space-x-6 text-gray-700">
        <ProfileMenu name={name} image={image} email={email} />
        
      </div>
    </nav>
  )
}
