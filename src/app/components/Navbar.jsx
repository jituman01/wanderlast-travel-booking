"use client"
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {

  const { 
        data: session, 
        
    } = authClient.useSession()

  // console.log(session);
  const user = session?.user;
  // console.log(user);
  
  

  return (
    <nav className="flex justify-between items-center bg-white p-5 border-b-2">
      <ul className="flex gap-2">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/destinations"}>Destinations</Link>
        </li>
        <li>
          <Link href={"/my-bookings"}>My Bookings</Link>
        </li>

        <li>
          <Link href={"/add-destination"}>Add Destination</Link>
        </li>
      </ul>

      <div>
        <Image
          src={"/assets/Wanderlast.png"}
          height={150}
          width={150}
          alt="logo"
        />
      </div>

      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        

        {user ? <div className="flex items-center gap-3">
          <li><Avatar>
        <Avatar.Image alt="John Doe" src={user?.image} />
            <Avatar.Fallback>{ user.name.charAt(0)}</Avatar.Fallback>
      </Avatar></li>
          <li>
            <Button className={'rounded-none'} variant="danger">Logout</Button>
          </li>
        </div>
          
        :<>
          <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/signup"}>Sign Up</Link>
        </li>
        </>}

      </ul>
    </nav>
  );
};

export default Navbar;