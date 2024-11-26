"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

export default function HeroSection({ 
  user
}: { 
  user?: CustomUser | null
}) {
  return (
    <section className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-gradient-to-b from-gray-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Create A Group and Share The Link to Chat with Friends!
      </h1>

      <LoginButton user={user}/>
      <div className="mt-4 w-full max-w-5xl flex justify-center">
        {/* Placeholder for Illustration/Image */}
        <img src="/images/conversation1.svg" alt="Illustration" className="mr-16 w-full h-auto"/>
      </div>
      
      <p className="text-xl text-gray-600 mb-8">
        MyChatApp makes it effortless to create secure chat links and start
        conversations in seconds.
      </p>
    </section>
  );
}