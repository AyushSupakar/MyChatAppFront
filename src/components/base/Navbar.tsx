"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import LogInModal from "../auth/LoginModal";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import LoginButton from "./LoginButton";
export default function Navbar({ 
    user
 }: { 
    user?: CustomUser | null
 }) {
  return (
    <nav className="px-4 py-2 flex sc justify-between items-center bg-white shadow-sm ">

      <div className="flex gap-6 items-center "> <img
      className="w-72"
        src="/LongLogo.png"
        
        alt=""
        />
      {/* <h1 className=" smallHeading text-4xl sm:text-2xl md:text-4xl font-extrabold">MyChatApp</h1> */}
      
      </div>
     
      <div className="flex items-center justify-center space-x-2 md:space-x-6 text-gray-700">
        <div className="flex">
        <Link className="font-bold text-lg hiddenOnSmall " href="/dashboard">Dashboard</Link>
        </div>

        <div className="flex">
          <Link className="font-bold text-lg hiddenOnSmall" href="#features">Features</Link>
          </div>

        <LoginButton user={user}/>
        
        
        
      </div>
    </nav>
  );
}